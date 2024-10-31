'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/ui/pageHeader"
import BottomNavBar from "@/components/ui/navBar"
import { useRouter } from 'next/navigation'
import { CreditCard } from 'lucide-react'

interface MealPlanOption {
    id: string
    semesterPrice: number
    yearPrice: number
    mealsPerWeek: number
}

export default function MealPlanPage() {
    const router = useRouter()

    const currentPlan = {
        type: "Semester Plan",
        mealsLeft: 12,
        expiration: "12/20/2024"
    }

    const availablePlans: MealPlanOption[] = [
        { id: '1', semesterPrice: 1299.00, yearPrice: 2499.00, mealsPerWeek: 12 },
        { id: '2', semesterPrice: 1599.00, yearPrice: 3099.00, mealsPerWeek: 24 },
        { id: '3', semesterPrice: 1399.00, yearPrice: 2699.00, mealsPerWeek: 12 },
        { id: '4', semesterPrice: 1499.00, yearPrice: 2899.00, mealsPerWeek: 12 }
    ]

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header title="Meal Plan Management" isHomeScreen={false} />

            <main className="flex-1 p-4 space-y-6 pt-16 pb-24">
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
                            onClick={() => router.push('/dining/meal-plan-history')}
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
                            <div key={plan.id} className="flex justify-between items-center py-2 border-b last:border-0">
                                <div className="flex items-center">
                                    <CreditCard className="w-5 h-5 mr-2 text-[#8B1A1A]" />
                                    <span>{plan.mealsPerWeek} Meals/Week</span>
                                </div>
                                <span>${plan.semesterPrice.toFixed(2)} - ${plan.yearPrice.toFixed(2)}</span>
                            </div>
                        ))}
                        <Button
                            className="w-full bg-[#8B1A1A] hover:bg-[#8B1A1A]/90 text-white"
                            onClick={() => router.push('/dining/offered-meal-plans')}
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