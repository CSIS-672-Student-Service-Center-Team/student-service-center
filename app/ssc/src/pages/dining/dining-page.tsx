import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/ui/pageHeader";
import BottomNavBar from "@/components/ui/navBar";
import { useRouter } from 'next/navigation';

interface MenuItem {
    name: string;
}

interface MealSection {
    title: string;
    items: MenuItem[];
}

type MealCategory = {
    title: string;
    items: {name: string}[];
}

export default function DiningPage() {
    const router = useRouter();
    const [showDietaryPreferences, setShowDietaryPreferences] = useState(false);
    const [location, setLocation] = useState('');
    const [meals, setMeals] = useState<MealSection[]>([]);

    const mealsData: Record<string, MealCategory[]> = {
        Bistro: [
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
        ],
        Liberty: [
            {
                title: "Breakfast",
                items: [
                    { name: "Omelette" },
                    { name: "Bagels" },
                    { name: "Fruit Salad" },
                    { name: "Cereal" }
                ]
            },
            {
                title: "Lunch",
                items: [
                    { name: "Pasta Salad" },
                    { name: "Chicken Sandwich" },
                    { name: "Vegetable Stir Fry" },
                    { name: "Pulled Pork Tacos" }
                ]
            },
            {
                title: "Dinner",
                items: [
                    { name: "Vegetarian Lasagna" },
                    { name: "BBQ Ribs" },
                    { name: "Baked Salmon" },
                    { name: "Rice Pilaf" }
                ]
            }
        ]
    };

    // Update meals when location changes
    useEffect(() => {
        if (location) {
            setMeals(mealsData[location]);
        } else {
            setMeals([]);
        }
    }, [location]);

    const toggleDietaryPreferences = () => {
        setShowDietaryPreferences(!showDietaryPreferences);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocation(e.target.value);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header title="Dining" isHomeScreen={false} />

            <main className="flex-1 p-4 space-y-6 pt-16">
                {/* Meal Card Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Meals</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Location Dropdown */}
                        <div className="mb-4">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                            <select
                                id="location"
                                value={location}
                                onChange={handleLocationChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                aria-label="Select dining location"
                            >
                                <option value="">Select a location</option>
                                <option value="Bistro">Bistro</option>
                                <option value="Liberty">Liberty</option>
                            </select>
                        </div>

                        {/* Meal Sections */}
                        {meals.map((section) => (
                            <div key={section.title} className="space-y-2">
                                <h3 className="font-semibold text-xl">{section.title}</h3>
                                <ul className="space-y-1">
                                    {section.items.map((item) => (
                                        <li key={item.name} className="text-sm text-gray-800">
                                            {item.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Dietary Preferences Toggle Button */}
                <Button
                    className="w-full bg-[#8B1A1A] hover:bg-[#8B1A1A]/90 text-white flex items-center justify-center space-x-2"
                    onClick={toggleDietaryPreferences}
                    aria-expanded={showDietaryPreferences ? "true" : "false"}
                    aria-controls="dietary-preferences"
                    aria-label="Toggle dietary preferences"
                >
                    <span>Dietary Preferences</span>
                </Button>

                {/* Dietary Preferences Section */}
                {showDietaryPreferences && (
                    <Card id="dietary-preferences" className="mt-4">
                        <CardHeader>
                            <CardTitle>Dietary Preferences</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <ul className="space-y-1">
                                <li>Vegetarian</li>
                                <li>Vegan</li>
                                <li>Gluten-Free</li>
                                <li>Halal</li>
                                <li>Kosher</li>
                            </ul>
                        </CardContent>
                    </Card>
                )}

                {/* Navigation Buttons */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <Button
                        className="bg-[#8B1A1A] hover:bg-[#8B1A1A]/90 text-white"
                        onClick={() => router.push('/dining/weekly-meals')}
                        aria-label="Go to weekly menu"
                    >
                        Weekly Menu
                    </Button>
                    <Button
                        className="bg-[#8B1A1A] hover:bg-[#8B1A1A]/90 text-white"
                        onClick={() => router.push('/dining/meal-plan')}
                        aria-label="Go to meal plan"
                    >
                        Meal Plan
                    </Button>
                    <Button
                        className="bg-[#8B1A1A] hover:bg-[#8B1A1A]/90 text-white"
                        onClick={() => router.push('/dining/offered-meal-plans')}
                        aria-label="Go to offered meal plans"
                    >
                        Offered Meal Plans
                    </Button>
                    {/* New Button for Meal Plan History */}
                    <Button
                        className="bg-[#8B1A1A] hover:bg-[#8B1A1A]/90 text-white"
                        onClick={() => router.push('/dining/meal-plan-history')}
                        aria-label="Go to meal plan history"
                    >
                        Meal Plan History
                    </Button>
                </div>
            </main>

            <BottomNavBar />
        </div>
    );
}
