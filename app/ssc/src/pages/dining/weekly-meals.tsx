"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import { ChevronDown, ChevronUp, Leaf, Wheat, Milk, Nut } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Meal {
  mealType: string;
  menu: string;
  dietaryInfo: string[];
}

interface LocationMenu {
  [key: string]: Meal[];
}

interface DietaryPreference {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function WeeklyMealsPage() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<string>("Bistro");
  const [menu, setMenu] = useState<LocationMenu>({});
  const [expandedDays, setExpandedDays] = useState<string[]>([]);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const dietaryOptions: DietaryPreference[] = [
    {
      id: "vegetarian",
      label: "Vegetarian",
      icon: <Leaf className="h-4 w-4" />,
    },
    {
      id: "vegan",
      label: "Vegan",
      icon: <Leaf className="h-4 w-4 fill-current" />,
    },
    {
      id: "gluten-free",
      label: "Gluten-free",
      icon: <Wheat className="h-4 w-4" />,
    },
    {
      id: "dairy-free",
      label: "Dairy-free",
      icon: <Milk className="h-4 w-4" />,
    },
    { id: "nut-free", label: "Nut-free", icon: <Nut className="h-4 w-4" /> },
  ];

  useEffect(() => {
    const today = new Date().getDay();
    const currentDay = days[today - 1];
    if (currentDay) {
      setExpandedDays([currentDay.toLowerCase()]);
    }
  }, []);

  const bistroMenu: LocationMenu = {
    Monday: [
      {
        mealType: "Breakfast",
        menu: "Bistro Pancakes, Bacon",
        dietaryInfo: ["dairy-free"],
      },
      {
        mealType: "Lunch",
        menu: "Bistro Chicken Salad, Soup",
        dietaryInfo: ["gluten-free"],
      },
      {
        mealType: "Dinner",
        menu: "Bistro Grilled Salmon",
        dietaryInfo: ["gluten-free", "dairy-free"],
      },
    ],
    Tuesday: [
      {
        mealType: "Breakfast",
        menu: "Bistro Scrambled Eggs, Toast",
        dietaryInfo: ["vegetarian"],
      },
      {
        mealType: "Lunch",
        menu: "Bistro Veggie Wrap",
        dietaryInfo: ["vegetarian", "vegan"],
      },
      {
        mealType: "Dinner",
        menu: "Bistro Pasta Primavera",
        dietaryInfo: ["vegetarian"],
      },
    ],
    Wednesday: [
      {
        mealType: "Breakfast",
        menu: "Bistro Oatmeal, Fresh Fruit",
        dietaryInfo: ["vegan", "gluten-free"],
      },
      {
        mealType: "Lunch",
        menu: "Bistro Turkey Club, Chips",
        dietaryInfo: ["nut-free"],
      },
      {
        mealType: "Dinner",
        menu: "Bistro Steak, Mashed Potatoes",
        dietaryInfo: ["gluten-free"],
      },
    ],
    Thursday: [
      {
        mealType: "Breakfast",
        menu: "Bistro Yogurt Parfait, Granola",
        dietaryInfo: ["vegetarian"],
      },
      {
        mealType: "Lunch",
        menu: "Bistro Caesar Salad, Breadsticks",
        dietaryInfo: ["vegetarian"],
      },
      {
        mealType: "Dinner",
        menu: "Bistro Chicken Stir Fry, Rice",
        dietaryInfo: ["dairy-free"],
      },
    ],
    Friday: [
      {
        mealType: "Breakfast",
        menu: "Bistro Belgian Waffles, Syrup",
        dietaryInfo: ["vegetarian"],
      },
      {
        mealType: "Lunch",
        menu: "Bistro Grilled Cheese, Tomato Soup",
        dietaryInfo: ["vegetarian"],
      },
      {
        mealType: "Dinner",
        menu: "Bistro Fish Tacos, Coleslaw",
        dietaryInfo: ["dairy-free"],
      },
    ],
  };

  const libertyMenu: LocationMenu = {
    Monday: [
      {
        mealType: "Breakfast",
        menu: "Liberty Bagels, Coffee",
        dietaryInfo: ["vegetarian"],
      },
      {
        mealType: "Lunch",
        menu: "Liberty Turkey Sandwich",
        dietaryInfo: ["nut-free"],
      },
      {
        mealType: "Dinner",
        menu: "Liberty Veggie Stir-Fry",
        dietaryInfo: ["vegan", "gluten-free"],
      },
    ],
    Tuesday: [
      {
        mealType: "Breakfast",
        menu: "Liberty Oatmeal, Fruit",
        dietaryInfo: ["vegan", "gluten-free"],
      },
      {
        mealType: "Lunch",
        menu: "Liberty Veggie Burger",
        dietaryInfo: ["vegetarian"],
      },
      {
        mealType: "Dinner",
        menu: "Liberty BBQ Chicken",
        dietaryInfo: ["gluten-free"],
      },
    ],
    Wednesday: [
      {
        mealType: "Breakfast",
        menu: "Liberty Breakfast Burrito",
        dietaryInfo: ["vegetarian"],
      },
      {
        mealType: "Lunch",
        menu: "Liberty Cobb Salad",
        dietaryInfo: ["gluten-free"],
      },
      {
        mealType: "Dinner",
        menu: "Liberty Spaghetti and Meatballs",
        dietaryInfo: [],
      },
    ],
    Thursday: [
      {
        mealType: "Breakfast",
        menu: "Liberty French Toast, Bacon",
        dietaryInfo: ["nut-free"],
      },
      {
        mealType: "Lunch",
        menu: "Liberty Chicken Caesar Wrap",
        dietaryInfo: ["nut-free"],
      },
      {
        mealType: "Dinner",
        menu: "Liberty Beef Stir Fry",
        dietaryInfo: ["dairy-free"],
      },
    ],
    Friday: [
      {
        mealType: "Breakfast",
        menu: "Liberty Breakfast Sandwich",
        dietaryInfo: ["vegetarian"],
      },
      {
        mealType: "Lunch",
        menu: "Liberty Tuna Salad",
        dietaryInfo: ["gluten-free"],
      },
      {
        mealType: "Dinner",
        menu: "Liberty Pizza Night",
        dietaryInfo: ["vegetarian"],
      },
    ],
  };

  useEffect(() => {
    const selectedMenu =
      selectedLocation === "Bistro" ? bistroMenu : libertyMenu;
    const filteredMenu = Object.fromEntries(
      Object.entries(selectedMenu).map(([day, meals]) => [
        day,
        meals.filter(
          (meal) =>
            dietaryPreferences.length === 0 ||
            dietaryPreferences.some((pref) => meal.dietaryInfo.includes(pref))
        ),
      ])
    );
    setMenu(filteredMenu);
  }, [selectedLocation, dietaryPreferences]);

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
  };

  const toggleDay = (day: string) => {
    setExpandedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleDietaryPreferenceChange = (
    preference: string,
    checked: boolean
  ) => {
    setDietaryPreferences((prev) =>
      checked ? [...prev, preference] : prev.filter((p) => p !== preference)
    );
  };

  const getDietaryIcon = (preference: string) => {
    const option = dietaryOptions.find((opt) => opt.id === preference);
    return option ? option.icon : null;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Weekly Meals" isHomeScreen={false} />

      <main className="flex-1 p-6 space-y-6 pt-20 pb-24">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Select Location</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              id="location"
              value={selectedLocation}
              onChange={handleLocationChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Bistro">Bistro</option>
              <option value="Liberty">Liberty</option>
            </select>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Dietary Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {dietaryOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={dietaryPreferences.includes(option.id)}
                    onCheckedChange={(checked) =>
                      handleDietaryPreferenceChange(
                        option.id,
                        checked as boolean
                      )
                    }
                  />
                  <label
                    htmlFor={option.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </label>
                  {option.icon}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Weekly Menu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {days.map((day) => (
              <div key={day} className="border rounded-md overflow-hidden">
                <button
                  className="w-full p-4 text-left font-semibold flex justify-between items-center bg-[#8B1A1A] text-white"
                  onClick={() => toggleDay(day.toLowerCase())}
                >
                  <span>{day}</span>
                  {expandedDays.includes(day.toLowerCase()) ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {expandedDays.includes(day.toLowerCase()) && (
                  <div className="p-4 space-y-2 bg-white">
                    {menu[day]?.map((meal, index) => (
                      <div
                        key={index}
                        className="border-b pb-2 last:border-b-0 last:pb-0"
                      >
                        <h4 className="font-medium">{meal.mealType}</h4>
                        <p className="text-sm text-gray-600">{meal.menu}</p>
                        <div className="flex gap-1 mt-1">
                          {meal.dietaryInfo.map((info) => (
                            <span
                              key={info}
                              className="text-xs bg-gray-100 px-1 py-0.5 rounded flex items-center"
                            >
                              {getDietaryIcon(info)}
                              <span className="ml-1">{info}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )) || (
                      <p className="text-sm text-gray-600">
                        Menu not yet available
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      <NavBar />
    </div>
  );
}
