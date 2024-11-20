"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import IdCard from "@/components/ui/idCard";
import { CreditCard, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const StudentIDPage: React.FC = () => {
  const router = useRouter();
  interface UserData {
    name: string;
    id_number: string;
    email: string;
    photo_url: string;
  }

  const [userData, setUserData] = useState<UserData | null>(null);

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

  const handleGetNewID = () => {
    console.log("Get New ID clicked");
    router.push("/newid");
  };

  const handleCardBalance = () => {
    console.log("Card Balance clicked");
    router.push("/balance");
  };

  const ButtonWrapper = ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "w-full h-40 bg-white border-2 border-[#8B1A1A] rounded-2xl",
        "shadow-lg hover:shadow-xl transition-shadow",
        "flex flex-col items-center justify-center gap-2",
        "p-4"
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Student ID" isHomeScreen={false} />

      <main className="flex-1 p-6 pt-20 pb-24">
        {userData ? (
          <IdCard
            name={userData.name}
            idNumber={`#${userData.id_number}`}
            email={userData.email}
            photoUrl={userData.photo_url}
          />
        ) : (
          <p>Loading...</p>
        )}

        <div className="flex flex-col gap-6 mt-6">
          <ButtonWrapper onClick={handleGetNewID}>
            <CreditCard className="w-12 h-12 text-[#8B1A1A]" />
            <span className="text-lg font-medium text-[#8B1A1A]">
              Get New ID
            </span>
          </ButtonWrapper>

          <ButtonWrapper onClick={handleCardBalance}>
            <Wallet className="w-12 h-12 text-[#8B1A1A]" />
            <span className="text-lg font-medium text-[#8B1A1A]">
              Card Balance
            </span>
          </ButtonWrapper>
        </div>
      </main>

      <NavBar />
    </div>
  );
};

export default StudentIDPage;
