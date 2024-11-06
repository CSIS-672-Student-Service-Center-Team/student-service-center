'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Header from "@/components/ui/pageHeader"
import BottomNavBar from "@/components/ui/navBar"
import { useRouter } from 'next/navigation'

interface DietaryPreference {
    id: string
    label: string
}

interface Meal {
    mealType: string
    menu: string
}

interface LocationMenu {
    [key: string]: Meal[] // Key will be the day, value is an array of meals for that day
}

export default function WeeklyMealsPage() {
    const router = useRouter()
    const [preferences, setPreferences] = useState<string[]>([])
    const [selectedLocation, setSelectedLocation] = useState<string>('Bistro')
    const [menu, setMenu] = useState<LocationMenu>({})

    const dietaryOptions: DietaryPreference[] = [
        { id: "gluten-free", label: "Gluten-free" },
        { id: "vegetarian", label: "Vegetarian" },
        { id: "vegan", label: "Vegan" },
        { id: "halal", label: "Halal" },
        { id: "dairy-free", label: "Dairy-free" },
        { id: "nut-free", label: "Nut-free" }
    ]

    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

    const handlePreferenceChange = (id: string, checked: boolean) => {
        setPreferences(prev =>
            checked
                ? [...prev, id]
                : prev.filter(p => p !== id)
        )
    }

    const handleSavePreferences = () => {
        console.log('Preferences saved:', preferences)
        // Replace this with actual API or localStorage call to persist user preferences
    }

    // Mock data for Bistro and Liberty menus
    const bistroMenu: LocationMenu = {
        Monday: [
            { mealType: 'Breakfast', menu: 'Bistro Pancakes, Bacon' },
            { mealType: 'Lunch', menu: 'Bistro Chicken Salad, Soup' },
            { mealType: 'Dinner', menu: 'Bistro Grilled Salmon' },
        ],
        Tuesday: [
            { mealType: 'Breakfast', menu: 'Bistro Scrambled Eggs, Toast' },
            { mealType: 'Lunch', menu: 'Bistro Veggie Wrap' },
            { mealType: 'Dinner', menu: 'Bistro Pasta Primavera' },
        ],
        // Add more days...
    }

    const libertyMenu: LocationMenu = {
        Monday: [
            { mealType: 'Breakfast', menu: 'Liberty Bagels, Coffee' },
            { mealType: 'Lunch', menu: 'Liberty Turkey Sandwich' },
            { mealType: 'Dinner', menu: 'Liberty Veggie Stir-Fry' },
        ],
        Tuesday: [
            { mealType: 'Breakfast', menu: 'Liberty Oatmeal, Fruit' },
            { mealType: 'Lunch', menu: 'Liberty Veggie Burger' },
            { mealType: 'Dinner', menu: 'Liberty BBQ Chicken' },
        ],
        // Add more days...
    }

    useEffect(() => {
        // Set the menu based on selected location
        if (selectedLocation === 'Bistro') {
            setMenu(bistroMenu)
        } else if (selectedLocation === 'Liberty') {
            setMenu(libertyMenu)
        }
    }, [selectedLocation])

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocation(e.target.value)
    }

    const handleCheckout = () => {
        // Placeholder for checkout logic
        // You can route to the checkout page with the selected location and preferences
        router.push(`/checkout?location=${selectedLocation}&preferences=${preferences.join(',')}`)
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header title="Meals For The Week" isHomeScreen={false} />

            <main className="flex-1 p-4 space-y-6 pt-16">
                {/* Dietary Preferences Section */}
                <Card className="bg-white shadow-sm border">
                    <CardHeader>
                        <CardTitle>Select any dietary preferences:</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {dietaryOptions.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={option.id}
                                    checked={preferences.includes(option.id)}
                                    onChange={(e) => handlePreferenceChange(option.id, e.target.checked)}
                                    aria-labelledby={option.id}
                                />
                                <label htmlFor={option.id} className="text-lg">{option.label}</label>
                            </div>
                        ))}
                        <Button
                            className="w-full bg-[#8B1A1A] hover:bg-[#8B1A1A]/90 text-white"
                            onClick={handleSavePreferences}
                        >
                            Save Preferences
                        </Button>
                    </CardContent>
                </Card>

                {/* Location Dropdown */}
                <div className="mb-6">
                    <label htmlFor="location" className="block text-lg font-medium">Select Location</label>
                    <select
                        id="location"
                        value={selectedLocation}
                        onChange={handleLocationChange}
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                    >
                        <option value="Bistro">Bistro</option>
                        <option value="Liberty">Liberty</option>
                    </select>
                </div>

                {/* Weekly Meals Accordion Section */}
                <Accordion type="single" collapsible className="space-y-4">
                    {weekDays.map((day) => (
                        <AccordionItem
                            key={day}
                            value={day.toLowerCase()}
                            trigger={
                                <AccordionTrigger className="bg-[#8B1A1A] text-white p-2 rounded-md">
                                    <span className="text-lg font-semibold">{day}</span>
                                </AccordionTrigger>
                            }
                        >
                            <AccordionContent>
                                <div className="space-y-4 p-2">
                                    {menu[day]?.map((meal, index) => (
                                        <div key={index}>
                                            <h4 className="font-medium">{meal.mealType}</h4>
                                            <p className="text-sm text-muted-foreground">{meal.menu}</p>
                                        </div>
                                    )) || <p className="text-sm text-muted-foreground">Menu not yet available</p>}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                {/* Checkout Button */}
                <Button
                    className="w-full bg-[#8B1A1A] hover:bg-[#8B1A1A]/90 text-white mt-4"
                    onClick={handleCheckout}
                >
                    Proceed to Checkout
                </Button>
            </main>

            <BottomNavBar />
        </div>
    )
}
