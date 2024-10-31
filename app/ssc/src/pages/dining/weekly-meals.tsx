import React, { useState } from 'react'
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

interface DietaryPreference {
    id: string
    label: string
}

export default function WeeklyMealsPage() {
    const [preferences, setPreferences] = useState<string[]>([])

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

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header title="Meals For The Week" isHomeScreen={false} />

            <main className="flex-1 p-4 space-y-6 pt-16">
                <Card>
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
                                    label={option.label}
                                />
                            </div>
                        ))}
                        <Button
                            className="w-full bg-[#8B1A1A] hover:bg-[#8B1A1A]/90"
                            onClick={() => console.log('Preferences saved:', preferences)}
                        >
                            Save Preference
                        </Button>
                    </CardContent>
                </Card>

                <Accordion type="single" collapsible>
                    {weekDays.map((day) => (
                        <AccordionItem
                            key={day}
                            value={day.toLowerCase()}
                            trigger={
                                <AccordionTrigger>
                                    <span className="text-lg font-semibold">{day}</span>
                                </AccordionTrigger>
                            }
                        >
                            <AccordionContent>
                                <div className="space-y-4 p-2">
                                    <div>
                                        <h4 className="font-medium">Breakfast</h4>
                                        <p className="text-sm text-muted-foreground">Menu not yet available</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Lunch</h4>
                                        <p className="text-sm text-muted-foreground">Menu not yet available</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Dinner</h4>
                                        <p className="text-sm text-muted-foreground">Menu not yet available</p>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </main>

            <BottomNavBar />
        </div>
    )
}