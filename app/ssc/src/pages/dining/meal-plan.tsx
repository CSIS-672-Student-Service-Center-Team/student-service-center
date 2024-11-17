'use client'

import React, { useState } from 'react'
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
    details: string
}

export default function MealPlanPage() {
    const router = useRouter()

    const [selectedPlan, setSelectedPlan] = useState<MealPlanOption | null>(null)

    const currentPlan = {
        type: "Semester Plan",
        mealsLeft: 12,
        expiration: "12/20/2024"
    }

    const availablePlans: MealPlanOption[] = [
        { id: '1', semesterPrice: 1299.00, yearPrice: 2499.00, mealsPerWeek: 12, details: "This plan provides 12 meals per week for the entire semester." },
        { id: '2', semesterPrice: 1599.00, yearPrice: 3099.00, mealsPerWeek: 24, details: "This plan provides 24 meals per week, ideal for high meal consumption." },
        { id: '3', semesterPrice: 1399.00, yearPrice: 2699.00, mealsPerWeek: 12, details: "A flexible plan with 12 meals per week, offering balanced meal options." },
        { id: '4', semesterPrice: 1499.00, yearPrice: 2899.00, mealsPerWeek: 12, details: "A premium plan with 12 meals per week and exclusive benefits." }
    ]

    const handleSelectPlan = (plan: MealPlanOption) => {
        setSelectedPlan(plan)
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header title="Meal Plan Management" isHomeScreen={false} />

            <main className="flex-1 p-4 space-y-6 pt-16 pb-24">
                {/* Current Meal Plan Section */}
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
                            aria-label="View Meal Plan History"
                        >
                            Meal Plan History
                        </Button>
                    </CardContent>
                </Card>

                {/* Available Meal Plans Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Available Meal Plans:</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {availablePlans.map((plan) => (
                                <div key={plan.id} className="relative border rounded-lg p-4" role="listitem">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <CreditCard className="w-5 h-5 mr-2 text-[#8B1A1A]" />
                                            <span>{plan.mealsPerWeek} Meals/Week</span>
                                        </div>
                                        <span className="font-semibold">${plan.semesterPrice.toFixed(2)} - ${plan.yearPrice.toFixed(2)}</span>
                                    </div>
                                    <p className="text-sm mb-4">{plan.details}</p>
                                    <Button
                                        variant={selectedPlan?.id === plan.id ? "outline" : "secondary"}
                                        className="w-full"
                                        onClick={() => handleSelectPlan(plan)}
                                        aria-pressed={selectedPlan?.id === plan.id ? "true" : "false"}
                                        aria-label={`Select ${plan.mealsPerWeek} Meals/Week Plan`}
                                    >
                                        {selectedPlan?.id === plan.id ? "Selected" : "Select Plan"}
                                    </Button>
                                    {selectedPlan?.id === plan.id && (
                                        <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 bg-gray-800 text-white flex justify-center items-center rounded-lg">
                                            <span className="text-lg font-bold">Plan Selected</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Button
                            className="w-full bg-[#8B1A1A] hover:bg-[#8B1A1A]/90 text-white"
                            onClick={() => router.push('/dining/offered-meal-plans')}
                            aria-label="Change Meal Plan"
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
