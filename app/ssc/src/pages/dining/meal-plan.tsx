"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/ui/pageHeader";
import BottomNavBar from "@/components/ui/navBar";
import { useRouter } from "next/navigation";
import { CreditCard, Clock } from "lucide-react";

interface MealSwipe {
  id: string;
  location: string;
  date: string;
  time: string;
}

export default function MealPlanPage() {
  const router = useRouter();

  const recentSwipes: MealSwipe[] = [
    {
      id: "1",
      location: "Main Dining Hall",
      date: "2024-03-19",
      time: "12:30 PM",
    },
    {
      id: "2",
      location: "Student Center Cafe",
      date: "2024-03-18",
      time: "6:45 PM",
    },
    { id: "3", location: "Library Cafe", date: "2024-03-18", time: "10:15 AM" },
    {
      id: "4",
      location: "Main Dining Hall",
      date: "2024-03-17",
      time: "1:00 PM",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Meal Plan Management" isHomeScreen={false} />

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

        <Card>
          <CardHeader>
            <CardTitle>Recent Meal Swipes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSwipes.map((swipe) => (
                <div
                  key={swipe.id}
                  className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{swipe.location}</p>
                    <p className="text-sm text-gray-500">{swipe.date}</p>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{swipe.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full bg-[#8B1A1A] hover:bg-[#8B1A1A]/90 text-white"
              onClick={() => router.push("/dining/offered-meal-plans")}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Change Meal Plan
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => router.push("/dining/meal-plan-history")}
            >
              View Meal Plan History
            </Button>
          </CardContent>
        </Card>
      </main>

      <BottomNavBar />
    </div>
  );
}
