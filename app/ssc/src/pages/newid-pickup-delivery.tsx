"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import IdCard from "@/components/ui/idCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const ConfirmStudentIDPage: React.FC = () => {
  const router = useRouter();
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "delivery">(
    "pickup"
  );

  const studentDetails = {
    name: "John Doe",
    idNumber: "#123456789",
    email: "johndoe@cofc.edu",
    photoUrl: "/uploaded-photo.jpg",
  };

  const handleCheckout = () => {
    console.log(`Processing ${deliveryOption} order`);
    const price = deliveryOption === "pickup" ? 20 : 25; // Example prices
    router.push(`/checkout?price=${price}&type=${deliveryOption}&from=newid`);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header title="Student ID" />

      <main className="flex-grow p-4 space-y-8 pt-16">
        <IdCard
          name={studentDetails.name}
          idNumber={studentDetails.idNumber}
          email={studentDetails.email}
          photoUrl={studentDetails.photoUrl}
        />

        <div className="space-y-8">
          <div className="flex justify-center gap-16">
            <label className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                checked={deliveryOption === "pickup"}
                onChange={() => setDeliveryOption("pickup")}
                className="w-6 h-6 border-2 border-gray-300 rounded-sm"
              />
              <span className="text-lg">Pickup</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                checked={deliveryOption === "delivery"}
                onChange={() => setDeliveryOption("delivery")}
                className="w-6 h-6 border-2 border-gray-300 rounded-sm"
              />
              <span className="text-lg">Delivery</span>
            </label>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleCheckout}
              className="w-[300px] py-6 text-xl font-medium bg-white hover:bg-gray-100 text-black rounded-full border-2 border-black"
            >
              Checkout
            </Button>
          </div>
        </div>
      </main>

      <NavBar />
    </div>
  );
};

export default ConfirmStudentIDPage;
