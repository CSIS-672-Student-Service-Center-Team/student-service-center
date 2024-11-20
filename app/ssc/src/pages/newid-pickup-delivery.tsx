"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import BottomNavBar from "@/components/ui/navBar";
import IdCard from "@/components/ui/idCard";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const ConfirmStudentIDPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "delivery">(
    "pickup"
  );
  const [userData, setUserData] = useState<UserData | null>(null);
  

  interface UserData {
    name: string;
    id_number: string;
    email: string;
    photo_url?: string;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users?userId=123456789`); // Replace with dynamic userId if needed
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleCheckout = () => {
    console.log(`Processing ${deliveryOption} order`);
    const price = deliveryOption === "pickup" ? 20 : 25; // Example prices
    router.push(`/checkout?price=${price}&type=${deliveryOption}&from=newid`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Confirm Student ID" isHomeScreen={false} />

      <main className="flex-grow p-4 space-y-6 pt-20 pb-24">
        <div className="w-full max-w-md mx-auto">
          {userData ? (
            <IdCard
              name={userData.name}
              idNumber={`#${userData.id_number}`}
              email={userData.email}
              photoUrl={userData.photo_url || "/Student_ID_Photo.jpg"}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#841414]">
              Delivery Options
            </h2>
            <div className="flex justify-center space-x-8">
              <Checkbox
                id="pickup"
                checked={deliveryOption === "pickup"}
                onChange={() => setDeliveryOption("pickup")}
                label="Pickup"
              />
              <Checkbox
                id="delivery"
                checked={deliveryOption === "delivery"}
                onChange={() => setDeliveryOption("delivery")}
                label="Delivery"
              />
            </div>
          </CardContent>
        </Card>

        <div className="w-full max-w-md mx-auto h-16 rounded-full bg-[#841414] hover:bg-[#9a1818] transition-colors overflow-hidden">
          <button
            onClick={handleCheckout}
            className="w-full h-full flex items-center justify-center text-xl font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#841414]"
          >
            Checkout
          </button>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default ConfirmStudentIDPage;