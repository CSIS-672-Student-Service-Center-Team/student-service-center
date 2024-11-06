'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/ui/pageHeader"
import BottomNavBar from "@/components/ui/navBar"
import { useRouter } from 'next/navigation'

interface MealPlanHistory {
    date: string
    planType: string
    mealsPerWeek: number
    startDate: string
    endDate: string
    price: string
    specialNotes: string
}

export default function MealPlanHistoryPage() {
    const router = useRouter()

    // Example meal plan history data (this can be fetched from an API or stored locally)
    const mealPlanHistory: MealPlanHistory[] = [
        { 
            date: "2024-10-30", 
            planType: "Standard Plan", 
            mealsPerWeek: 15,
            startDate: "2024-09-01",
            endDate: "2024-12-01",
            price: "$100 per month",
            specialNotes: "No special notes"
        },
        { 
            date: "2024-10-29", 
            planType: "Premium Plan", 
            mealsPerWeek: 25,
            startDate: "2024-09-01",
            endDate: "2024-12-01",
            price: "$150 per month",
            specialNotes: "Can be upgraded to deluxe package"
        },
        { 
            date: "2024-10-28", 
            planType: "Standard Plan", 
            mealsPerWeek: 15,
            startDate: "2024-09-01",
            endDate: "2024-12-01",
            price: "$100 per month",
            specialNotes: "Includes access to vegetarian options"
        }
    ]

    // State for handling the modal
    const [selectedMealPlan, setSelectedMealPlan] = useState<MealPlanHistory | null>(null)

    // Handle the opening of the modal with meal plan details
    const handleViewDetails = (mealPlan: MealPlanHistory) => {
        setSelectedMealPlan(mealPlan)
    }

    // Handle closing the modal
    const closeModal = () => {
        setSelectedMealPlan(null)
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header title="Meal Plan History" isHomeScreen={false} />

            <main className="flex-1 p-6 space-y-6 pt-16">
                {/* Meal Plan History Section */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-center">
                            Previous Meal Plan Selections
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {mealPlanHistory.length === 0 ? (
                            <p className="text-center text-sm text-gray-500">
                                No meal plans selected yet.
                            </p>
                        ) : (
                            mealPlanHistory.map((mealPlan, index) => (
                                <div key={index} className="flex justify-between items-center p-4 border-b border-gray-200 rounded-lg">
                                    <div>
                                        <div className="text-lg font-medium text-gray-800">{mealPlan.date}</div>
                                        <div className="text-sm text-gray-600">{mealPlan.planType}</div>
                                    </div>
                                    <Button 
                                        className="bg-[#8B1A1A] text-white hover:bg-[#8B1A1A]/90"
                                        onClick={() => handleViewDetails(mealPlan)}
                                        aria-label={`View details for ${mealPlan.date}`}
                                    >
                                        View Details
                                    </Button>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    <Button
                        className="bg-[#8B1A1A] hover:bg-[#8B1A1A]/90"
                        onClick={() => router.push('/dining/weekly-menu')}
                        aria-label="Go to Weekly Menu"
                    >
                        Weekly Menu
                    </Button>
                    <Button
                        className="bg-[#8B1A1A] hover:bg-[#8B1A1A]/90"
                        onClick={() => router.push('/dining/meal-plan')}
                        aria-label="Go to Meal Plan"
                    >
                        Meal Plan
                    </Button>
                    <Button
                        className="bg-[#8B1A1A] hover:bg-[#8B1A1A]/90"
                        onClick={() => router.push('/dining/meal-plan-history')}
                        aria-label="Go to Meal Plan History"
                    >
                        Meal Plan History
                    </Button>
                </div>
            </main>

            {/* Modal for Meal Plan Details */}
            {selectedMealPlan && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                        <div className="text-xl font-semibold text-gray-800">{selectedMealPlan.date}</div>
                        <div className="text-lg text-gray-600">{selectedMealPlan.planType}</div>
                        <div className="mt-4 text-sm text-gray-700">
                            <p><strong>Meals per Week:</strong> {selectedMealPlan.mealsPerWeek}</p>
                            <p><strong>Start Date:</strong> {selectedMealPlan.startDate}</p>
                            <p><strong>End Date:</strong> {selectedMealPlan.endDate}</p>
                            <p><strong>Price:</strong> {selectedMealPlan.price}</p>
                            <p><strong>Special Notes:</strong> {selectedMealPlan.specialNotes}</p>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <Button 
                                className="bg-[#8B1A1A] text-white hover:bg-[#8B1A1A]/90"
                                onClick={closeModal}
                                aria-label="Close details modal"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <BottomNavBar />
        </div>
    )
}
