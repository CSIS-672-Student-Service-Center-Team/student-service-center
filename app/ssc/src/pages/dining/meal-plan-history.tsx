"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "@/components/ui/pageHeader";
import BottomNavBar from "@/components/ui/navBar";
import { CalendarIcon, DollarSignIcon, UtensilsIcon } from "lucide-react";

interface MealPlanHistory {
  id: string;
  semester: string;
  planType: string;
  price: number;
  totalMeals: number;
  usedMeals: number;
}

export default function MealPlanHistoryPage() {
  const [mealPlanHistory, setMealPlanHistory] = React.useState<
    MealPlanHistory[]
  >([
    {
      id: "1",
      semester: "Fall 2023",
      planType: "12 Meals/Week",
      price: 1299.0,
      totalMeals: 180,
      usedMeals: 165,
    },
    {
      id: "2",
      semester: "Spring 2023",
      planType: "24 Meals/Week",
      price: 1599.0,
      totalMeals: 360,
      usedMeals: 320,
    },
    {
      id: "3",
      semester: "Fall 2022",
      planType: "12 Meals/Week",
      price: 1199.0,
      totalMeals: 180,
      usedMeals: 170,
    },
    {
      id: "4",
      semester: "Spring 2022",
      planType: "12 Meals/Week",
      price: 1199.0,
      totalMeals: 180,
      usedMeals: 155,
    },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Meal Plan History" isHomeScreen={false} />

      <main className="flex-1 p-4 space-y-6 pt-20 pb-24 overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#8B1A1A]">
              Your Meal Plan History
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Semester</TableHead>
                  <TableHead className="w-1/4">Plan Type</TableHead>
                  <TableHead className="w-1/4">Price</TableHead>
                  <TableHead className="w-1/4">Meals Used</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mealPlanHistory.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">
                      {plan.semester}
                    </TableCell>
                    <TableCell>{plan.planType}</TableCell>
                    <TableCell>${plan.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {plan.usedMeals} / {plan.totalMeals}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <CalendarIcon className="w-12 h-12 text-[#8B1A1A] mb-4" />
              <h3 className="text-lg font-semibold mb-2">Total Semesters</h3>
              <p className="text-3xl font-bold">{mealPlanHistory.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <DollarSignIcon className="w-12 h-12 text-[#8B1A1A] mb-4" />
              <h3 className="text-lg font-semibold mb-2">Total Spent</h3>
              <p className="text-3xl font-bold">
                $
                {mealPlanHistory
                  .reduce((sum, plan) => sum + plan.price, 0)
                  .toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <UtensilsIcon className="w-12 h-12 text-[#8B1A1A] mb-4" />
              <h3 className="text-lg font-semibold mb-2">Total Meals Used</h3>
              <p className="text-3xl font-bold">
                {mealPlanHistory.reduce((sum, plan) => sum + plan.usedMeals, 0)}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}
