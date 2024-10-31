'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/ui/pageHeader"
import BottomNavBar from "@/components/ui/navBar"
import { useRouter } from 'next/navigation'

interface MealPlanOption {
    name: string
    price: number
}

export default function MealPlanPage() {
    const router = useRouter()

    const currentPlan = {
        type: "Semester Plan",
        mealsLeft: 12,
        expiration: "12/20/2024"
    }

    const availablePlans: MealPlanOption[] = [
        { name: "5 meals/week", price: 100 },
        { name: "10 meals/week", price: 150 },
        { name: "unlimited", price: 200 }
    ]

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header title="Meal Plan Management" isHomeScreen={false} />

            <main className="flex-1 p-4 space-y-6 pt-16">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Current Meal Plan:</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-lg font-medium">{currentPlan.type}</p>
                            <p>Meals Left: {currentPlan.mealsLeft}</p>
                            <p>Expiration: {currentPlan.expiration}</p>
                        </div>
                        <Button
                            variant="secondary"
                            className="w-full"
                            onClick={() => router.push('/dining/meal-plan/history')}
                        >
                            Meal Plan History
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Available Meal Plans:</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {availablePlans.map((plan) => (
                            <div key={plan.name} className="flex justify-between items-center py-2 border-b last:border-0">
                                <span>{plan.name}</span>
                                <span>${plan.price}</span>
                            </div>
                        ))}
                        <Button
                            className="w-full bg-[#8B1A1A] hover:bg-[#8B1A1A]/90"
                            onClick={() => router.push('/dining/meal-plan/change')}
                        >
                            Change Meal Plan
                        </Button>
                    </CardContent>
                </Card>
            </main>

            <BottomNavBar />
        </div>
    )
}