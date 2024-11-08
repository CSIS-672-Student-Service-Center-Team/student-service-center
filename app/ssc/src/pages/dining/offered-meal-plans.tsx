"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/ui/pageHeader";
import BottomNavBar from "@/components/ui/navBar";
import { useRouter } from "next/navigation";
import { CreditCard, Check } from "lucide-react";

interface MealPlanOption {
  id: string;
  semesterPrice: number;
  yearPrice: number;
  mealsPerWeek: number;
}

export default function OfferedMealPlansPage() {
  const router = useRouter();
  const [selectedTypes, setSelectedTypes] = React.useState<
    Record<string, "Year" | "Semester">
  >({});

  const mealPlans: MealPlanOption[] = [
    { id: "1", semesterPrice: 1299.0, yearPrice: 2499.0, mealsPerWeek: 12 },
    { id: "2", semesterPrice: 1599.0, yearPrice: 3099.0, mealsPerWeek: 24 },
    { id: "3", semesterPrice: 1399.0, yearPrice: 2699.0, mealsPerWeek: 12 },
    { id: "4", semesterPrice: 1499.0, yearPrice: 2899.0, mealsPerWeek: 12 },
  ];

  React.useEffect(() => {
    const initialTypes: Record<string, "Year" | "Semester"> = {};
    mealPlans.forEach((plan) => {
      initialTypes[plan.id] = "Year";
    });
    setSelectedTypes(initialTypes);
  }, []);

  const handleTypeChange = (planId: string, type: "Year" | "Semester") => {
    setSelectedTypes((prev) => ({
      ...prev,
      [planId]: type,
    }));
  };

  const getPrice = (plan: MealPlanOption) => {
    return selectedTypes[plan.id] === "Year"
      ? plan.yearPrice
      : plan.semesterPrice;
  };

  const handleCheckout = (plan: MealPlanOption) => {
    const price = getPrice(plan);
    router.push(
      `/checkout?price=${price}&type=meal-plan&planId=${plan.id}&planType=${
        selectedTypes[plan.id] || "Year"
      }&from=dining/dining-page`
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Meal Plans" isHomeScreen={false} />

      <main className="flex-1 p-4 space-y-6 pt-20 pb-24">
        <Card className="bg-white shadow-sm border rounded-xl">
          <CardContent className="p-4">
            <h2 className="text-[#8B1A1A] font-semibold text-xl mb-3">
              Your Current Meal Plan
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Plan:</span> 12 Meals Per Week
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Remaining Balance:</span> $750.25
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Meals Left This Week:</span> 8
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Plan Expires:</span> May 15, 2025
              </p>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Visit the dining hall or use the mobile app to check your daily
              meal credits and special offers.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {mealPlans.map((plan) => (
            <Card
              key={plan.id}
              className="bg-[#841414] text-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-3xl overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="p-6 pb-0">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">Meals</h3>
                      <p className="text-4xl font-bold">
                        ${getPrice(plan).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center text-lg">
                      <CreditCard className="w-6 h-6 mr-3" />
                      <span>{plan.mealsPerWeek} Meals Per Week</span>
                    </div>
                  </div>
                </div>

                <div className="flex border-t border-b border-white">
                  <button
                    onClick={() => handleTypeChange(plan.id, "Year")}
                    className={`flex-1 py-4 px-6 text-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ease-in-out text-white
                      ${
                        selectedTypes[plan.id] === "Year"
                          ? "bg-[#BFA87C]"
                          : "bg-[#841414] hover:bg-[#9a1818]"
                      }`}
                  >
                    Year
                    {selectedTypes[plan.id] === "Year" && (
                      <Check className="h-5 w-5 ml-2" />
                    )}
                  </button>
                  <button
                    onClick={() => handleTypeChange(plan.id, "Semester")}
                    className={`flex-1 py-4 px-6 text-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ease-in-out border-l border-white text-white
                      ${
                        selectedTypes[plan.id] === "Semester"
                          ? "bg-[#BFA87C]"
                          : "bg-[#841414] hover:bg-[#9a1818]"
                      }`}
                  >
                    Semester
                    {selectedTypes[plan.id] === "Semester" && (
                      <Check className="h-5 w-5 ml-2" />
                    )}
                  </button>
                </div>

                <button
                  className="w-full bg-[#841414] hover:bg-[#9a1818] text-white text-xl py-4 px-6 border-t border-white transition-all duration-300 ease-in-out flex items-center justify-center rounded-b-3xl"
                  onClick={() => handleCheckout(plan)}
                >
                  Checkout
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}
