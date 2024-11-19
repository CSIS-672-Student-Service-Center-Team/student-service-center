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
  description: string;
}

export default function OfferedMealPlansPage() {
  const router = useRouter();
  const [selectedTypes, setSelectedTypes] = React.useState<
    Record<string, "Year" | "Semester">
  >({});

  const mealPlans: MealPlanOption[] = [
    {
      id: "1",
      semesterPrice: 1299.0,
      yearPrice: 2499.0,
      mealsPerWeek: 12,
      description: "12 meals per week for a balanced plan.",
    },
    {
      id: "2",
      semesterPrice: 1599.0,
      yearPrice: 3099.0,
      mealsPerWeek: 24,
      description: "24 meals per week for higher meal consumption.",
    },
    {
      id: "3",
      semesterPrice: 1399.0,
      yearPrice: 2699.0,
      mealsPerWeek: 12,
      description: "Flexible plan with 12 meals per week.",
    },
    {
      id: "4",
      semesterPrice: 1499.0,
      yearPrice: 2899.0,
      mealsPerWeek: 12,
      description: "Premium plan with additional benefits.",
    },
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

      <main className="flex-1 p-4 space-y-6 pt-16">
        <Card className="bg-white shadow-sm border">
          <CardContent className="p-4">
            <h2 className="text-[#8B1A1A] font-semibold text-lg mb-2">
              Your Current Meal Plan
            </h2>
            <p className="text-gray-600">
              Some information about your meal plan.
            </p>
            <p className="text-gray-600">
              Here you can review and select your preferred meal plan options
              for the year or semester.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mealPlans.map((plan) => (
            <Card
              key={plan.id}
              className="bg-[#8B1A1A] text-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4">
                  <h3
                    className="text-lg font-semibold"
                    id={`meal-plan-title-${plan.id}`}
                  >
                    Meals
                  </h3>
                  <p
                    className="text-2xl font-bold"
                    aria-labelledby={`meal-plan-title-${plan.id}`}
                  >
                    ${getPrice(plan).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center mb-4">
                  <CreditCard className="w-5 h-5 mr-2" aria-hidden="true" />
                  <span>{plan.mealsPerWeek} Meals Per Week</span>
                </div>

                <p className="text-sm mb-4">{plan.description}</p>

                <div className="flex mb-4 bg-[#6B1414] rounded-lg p-1">
                  <Button
                    variant="ghost"
                    className={`flex-1 ${
                      selectedTypes[plan.id] === "Year"
                        ? "bg-[#4C0F0F] text-white"
                        : "text-white"
                    } transition-colors`}
                    onClick={() => handleTypeChange(plan.id, "Year")}
                    aria-pressed={selectedTypes[plan.id] === "Year"}
                    aria-label={`Select Year plan for ${plan.mealsPerWeek} meals per week`}
                  >
                    Year
                  </Button>
                  <Button
                    variant="ghost"
                    className={`flex-1 ${
                      selectedTypes[plan.id] === "Semester"
                        ? "bg-[#4C0F0F] text-white"
                        : "text-white"
                    } transition-colors`}
                    onClick={() => handleTypeChange(plan.id, "Semester")}
                    aria-pressed={selectedTypes[plan.id] === "Semester"}
                    aria-label={`Select Semester plan for ${plan.mealsPerWeek} meals per week`}
                  >
                    Semester
                  </Button>
                </div>

                <Button
                  className="mt-auto bg-[#4C0F0F] hover:bg-[#5F1212] text-white transition-all"
                  onClick={() => handleCheckout(plan)}
                  aria-label={`Proceed to checkout for ${
                    plan.mealsPerWeek
                  } meals per week, priced at $${getPrice(plan).toFixed(2)}`}
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
  );
}
