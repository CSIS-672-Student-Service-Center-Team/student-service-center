"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import IdCard from "@/components/ui/idCard";
import { CreditCard, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const StudentIDPage: React.FC = () => {
  const router = useRouter();

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
        <IdCard
          name="John Doe"
          idNumber="#123456789"
          email="johndoe@cofc.edu"
          photoUrl="/Student_ID_Photo.jpg"
        />

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
