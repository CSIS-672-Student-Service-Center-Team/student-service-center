'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

export default function OfferedMealPlansPage() {
  const router = useRouter()
  const [selectedTypes, setSelectedTypes] = React.useState<Record<string, 'Year' | 'Semester'>>({})

  const mealPlans: MealPlanOption[] = [
    { id: '1', semesterPrice: 1299.00, yearPrice: 2499.00, mealsPerWeek: 12 },
    { id: '2', semesterPrice: 1599.00, yearPrice: 3099.00, mealsPerWeek: 24 },
    { id: '3', semesterPrice: 1399.00, yearPrice: 2699.00, mealsPerWeek: 12 },
    { id: '4', semesterPrice: 1499.00, yearPrice: 2899.00, mealsPerWeek: 12 }
  ]

  React.useEffect(() => {
    const initialTypes: Record<string, 'Year' | 'Semester'> = {}
    mealPlans.forEach(plan => {
      initialTypes[plan.id] = 'Year'
    })
    setSelectedTypes(initialTypes)
  }, [])

  const handleTypeChange = (planId: string, type: 'Year' | 'Semester') => {
    setSelectedTypes(prev => ({
      ...prev,
      [planId]: type
    }))
  }

  const getPrice = (plan: MealPlanOption) => {
    return selectedTypes[plan.id] === 'Year' ? plan.yearPrice : plan.semesterPrice
  }

  const handleCheckout = (plan: MealPlanOption) => {
    const price = getPrice(plan)
    router.push(`/checkout?price=${price}&type=meal-plan&planId=${plan.id}&planType=${selectedTypes[plan.id] || 'Year'}`)
  }

  return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header title="Meal Plans" isHomeScreen={false} />

        <main className="flex-1 p-4 space-y-6 pt-16">
          <Card className="bg-white shadow-sm border">
            <CardContent className="p-4">
              <h2 className="text-[#8B1A1A] font-semibold text-lg mb-2">Your Current Meal Plan</h2>
              <p className="text-gray-600">Some information about your meal plan.</p>
              <p className="text-gray-600">blah blah.</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            {mealPlans.map((plan) => (
                <Card key={plan.id} className="bg-[#8B1A1A] text-white">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">Meals</h3>
                      <p className="text-2xl font-bold">${getPrice(plan).toFixed(2)}</p>
                    </div>

                    <div className="flex items-center mb-4">
                      <CreditCard className="w-5 h-5 mr-2" />
                      <span>{plan.mealsPerWeek} Meals Per Week</span>
                    </div>

                    <div className="flex mb-4 bg-[#6B1414] rounded-lg p-1">
                      <Button
                          variant="ghost"
                          className={`flex-1 ${selectedTypes[plan.id] === 'Year' ? 'bg-[#98D8AA] text-black' : 'text-white'}`}
                          onClick={() => handleTypeChange(plan.id, 'Year')}
                      >
                        Year
                      </Button>
                      <Button
                          variant="ghost"
                          className={`flex-1 ${selectedTypes[plan.id] === 'Semester' ? 'bg-[#98D8AA] text-black' : 'text-white'}`}
                          onClick={() => handleTypeChange(plan.id, 'Semester')}
                      >
                        Semester
                      </Button>
                    </div>

                    <Button
                        className="mt-auto bg-[#98D8AA] hover:bg-[#98D8AA]/90 text-black"
                        onClick={() => handleCheckout(plan)}
                    >
                      Checkout
                    </Button>
                  </CardContent>
                </Card>
            ))}
          </div>
        </main>

        <BottomNavBar />
      </div>
  )
}