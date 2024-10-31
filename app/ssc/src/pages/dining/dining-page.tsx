'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/ui/pageHeader"
import BottomNavBar from "@/components/ui/navBar"
import { useRouter } from 'next/navigation'

interface MenuItem {
    name: string
}

interface MealSection {
    title: string
    items: MenuItem[]
}

export default function DiningPage() {
    const router = useRouter()

    const meals: MealSection[] = [
        {
            title: "Breakfast",
            items: [
                { name: "Scrambled Eggs" },
                { name: "Pancakes" },
                { name: "Fresh Fruit" },
                { name: "Yogurt" }
            ]
        },
        {
            title: "Lunch",
            items: [
                { name: "Salad Bar" },
                { name: "Sandwich Bar" },
                { name: "Cheeseburger & Fries" },
                { name: "Rice & Pulled Pork" }
            ]
        },
        {
            title: "Dinner",
            items: [
                { name: "Salad Bar" },
                { name: "Pasta with Red Sauce" },
                { name: "Chicken Parm" },
                { name: "Beef Meatballs" }
            ]
        }
    ]

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header title="Dining" isHomeScreen={false} />

            <main className="flex-1 p-4 space-y-6 pt-16">
                <Card>
                    <CardHeader>
                        <CardTitle>Today&apos;s Meals</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {meals.map((section) => (
                            <div key={section.title} className="space-y-2">
                                <h3 className="font-semibold">{section.title}</h3>
                                <ul className="space-y-1">
                                    {section.items.map((item) => (
                                        <li key={item.name} className="text-sm">
                                            {item.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        className="bg-[#8B1A1A] hover:bg-[#8B1A1A]/90"
                        onClick={() => router.push('/dining/weekly-meals')}
                    >
                        Weekly Meals
                    </Button>
                    <Button
                        className="bg-[#8B1A1A] hover:bg-[#8B1A1A]/90"
                        onClick={() => router.push('/dining/meal-plan')}
                    >
                        Meal Plan
                    </Button>
                </div>
            </main>

            <BottomNavBar />
        </div>
    )
}