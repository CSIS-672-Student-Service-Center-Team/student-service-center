"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import IdCard from "@/components/ui/idCard";
import { Car, Utensils, CreditCard } from "lucide-react";
import ButtonWrapper from "@/components/ui/ButtonWrapper";
import { currentUserId } from "@/lib/currentUser";
import InteractiveIdCardDb from "@/components/ui/interactive-id-card_db";

interface UserData {
  id: number;
  name: string;
  idNumber: string;
  email: string;
  photoUrl: string;
}

export default function HomeScreen({ onLogout }: { onLogout: () => void }) {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users?userId=${currentUserId}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Home" isHomeScreen={true} onLogout={onLogout} />

      <main className="flex-1 p-6 pt-20 pb-24">
        <IdCard
          name={userData.name}
          idNumber={userData.idNumber}
          email={userData.email}
          photoUrl={userData.photoUrl}
        />

        <div className="flex flex-col gap-6 mt-6">
          <ButtonWrapper onClick={() => handleNavigation("/parking")}>
            <Car className="w-12 h-12 text-[#8B1A1A]" />
            <span className="text-lg font-medium text-[#8B1A1A]">PARKING</span>
          </ButtonWrapper>

          <ButtonWrapper onClick={() => handleNavigation("/dining/dining-page")}>
            <Utensils className="w-12 h-12 text-[#8B1A1A]" />
            <span className="text-lg font-medium text-[#8B1A1A]">DINING</span>
          </ButtonWrapper>

          <ButtonWrapper onClick={() => handleNavigation("/id")}>
            <CreditCard className="w-12 h-12 text-[#8B1A1A]" />
            <span className="text-lg font-medium text-[#8B1A1A]">ID</span>
          </ButtonWrapper>
        </div>
      </main>

      <NavBar />
    </div>
  );
}