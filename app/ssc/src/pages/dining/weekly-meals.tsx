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

interface DietaryPreference {
    id: string
    label: string
}

export default function WeeklyMealsPage() {
    const [preferences, setPreferences] = useState<string[]>([])
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

    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

    useEffect(() => {
        const today = new Date().getDay()
        const currentDay = weekDays[today - 1] // Adjust for 0-indexed array
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
            prev.length === weekDays.length ? [] : weekDays.map(day => day.toLowerCase())
        )
    }, [weekDays])

    const handleSavePreferences = () => {
        console.log('Preferences saved:', preferences)
        setIsOverlayOpen(false)
    }

    const handleCloseOverlay = () => {
        setIsOverlayOpen(false)
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header title="Meals For The Week" isHomeScreen={false} />

            {/* <main className="flex-1 p-4 space-y-6 pt-20"> */}
            <main className="content">
                <Button
                    onClick={() => setIsOverlayOpen(true)}
                    className="w-full bg-[#8B1A1A] hover:bg-[#8B1A1A]/90"
                >
                    Set Dietary Preferences
                </Button>

                {isOverlayOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
                            <button
                                onClick={handleCloseOverlay}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                aria-label="Close"
                            >
                                <X size={24} />
                            </button>
                            <h2 className="text-xl font-bold mb-4">Select Dietary Preferences</h2>
                            <div className="space-y-4">
                                {dietaryOptions.map((option) => (
                                    <div key={option.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={option.id}
                                            checked={preferences.includes(option.id)}
                                            onChange={(checked) => handlePreferenceChange(option.id, true)}
                                        />
                                        <label htmlFor={option.id}>{option.label}</label>
                                    </div>
                                ))}
                            </div>
                            <Button
                                onClick={handleSavePreferences}
                                className="w-full mt-6 bg-[#8B1A1A] hover:bg-[#8B1A1A]/90"
                            >
                                Save Preferences
                            </Button>
                        </div>
                    </div>
                )}

                <Button
                    onClick={handleToggleAll}
                    className="w-full mb-4 bg-[#8B1A1A] hover:bg-[#8B1A1A]/90"
                >
                    {expandedDays.length === weekDays.length ? (
                        <>
                            <ChevronUp className="mr-2 h-4 w-4" />
                            Collapse All
                        </>
                    ) : (
                        <>
                            <ChevronDown className="mr-2 h-4 w-4" />
                            Expand All
                        </>
                    )}
                </Button>

                <Accordion type="multiple" value={expandedDays} onValueChange={setExpandedDays}>
                    {weekDays.map((day) => (
                        <AccordionItem
                            key={day}
                            value={day.toLowerCase()}
                            trigger={<AccordionTrigger>
                                <span className="text-lg font-semibold">{day}</span>
                            </AccordionTrigger>}
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