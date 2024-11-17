'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Header from "@/components/ui/pageHeader"
import BottomNavBar from "@/components/ui/navBar"
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
    MealCategory,
    MealSection,
    DietaryPreference,
} from '@/lib/dining-utils';
import DietaryOverlay, {
    DietaryOverlayProps
} from '@/components/ui/dietaryOverlay'
import { Card } from '@/components/ui/card'


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
    const [isDietaryOverlayOpen, setDietaryOverlay] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<string>('Bistro')
    const [menu, setMenu] = useState<LocationMenu>({});

    const [expandedDays, setExpandedDays] = useState<string[]>([])
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)

    const dietaryOptions: DietaryPreference[] = [
        { id: "gluten-free", label: "Gluten-free" },
        { id: "vegetarian", label: "Vegetarian" },
        { id: "vegan", label: "Vegan" },
        { id: "halal", label: "Halal" },
        { id: "dairy-free", label: "Dairy-free" },
        { id: "nut-free", label: "Nut-free" }
    ]

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

    useEffect(() => {
        const today = new Date().getDay()
        const currentDay = days[today - 1] // Adjust for 0-indexed array
        if (currentDay) {
            setExpandedDays([currentDay.toLowerCase()])
        }
    }, [])

    const handlePreferenceChange = (id: string, checked: boolean) => {
        setPreferences(prev =>
            checked
                ? [...prev, id]
                : prev.filter(p => p !== id)
        )
    }

    const handleToggleAll = useCallback(() => {
        setExpandedDays(prev =>
            prev.length === days.length ? [] : days.map(day => day.toLowerCase())
        )
    }, [days])

    


    const toggleDietaryPreferences = () => {
        setDietaryOverlay(!isDietaryOverlayOpen);
    };

    const handleSavePreferences = () => {
        console.log('Preferences saved:', preferences)
        setDietaryOverlay(false);
        // Replace this with actual API or localStorage call to persist user preferences
    }

    const handleCloseOverlay = () => {
        setDietaryOverlay(false);
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
                <Card className="bg-white shadow-sm border flex justify-center items-center">

                        <Button
                            className="w-full h-[4rem] text-3xl bg-[#8B1A1A] hover:bg-[#8B1A1A]/90 text-white "
                            onClick={toggleDietaryPreferences}
                            aria-expanded={isDietaryOverlayOpen ? "true" : "false"}
                            aria-controls="dietary-preferences"
                            aria-label="Toggle dietary preferences"
                        >
                            Dietary Preferences
                        </Button>
                </Card>

                {isDietaryOverlayOpen && 
                    <DietaryOverlay 
                        preferences={preferences}
                        dietaryPreferences={dietaryOptions}
                        onClose={handleCloseOverlay}
                        onPreferenceChange={handlePreferenceChange}
                        onSave={handleSavePreferences}
                    />
                }
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
                    {days.map((day) => (
                        <AccordionItem
                            key={day}
                            value={day.toLowerCase()}
                            trigger={
                                <AccordionTrigger className="bg-[#8B1A1A] w-[60%] text-center h-[3rem] text-white p-2 rounded-md">
                                    <span className="text-2xl font-semibold">{day}</span>
                                </AccordionTrigger>
                            }
                        >

                            <AccordionContent>
                                <div className="space-y-4 p-2">
                                    {menu[day]?.map((meal, index) => (
                                        <div key={index}>
                                            <h4 className="font-medium">{meal.mealType}</h4>
                                            <p className="text-lg text-muted-foreground">{meal.menu}</p>
                                        </div>
                                    )) || <p className="text-lg text-muted-foreground">Menu not yet available</p>}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                {/* Checkout Button */}
                {/* <Button
                    className="w-full bg-[#8B1A1A] hover:bg-[#8B1A1A]/90 text-white mt-4"
                    onClick={handleCheckout}
                >
                    Proceed to Checkout
                </Button> */}
            </main>

            <BottomNavBar />
        </div>
    )
}
