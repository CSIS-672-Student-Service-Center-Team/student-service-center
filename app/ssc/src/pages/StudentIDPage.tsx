import React from "react";
import Image from "next/image";
import { UserSquare2, Mail, Banknote } from "lucide-react";
import Header from "@/components/ui/Header";
import StudentIDCard from "@/components/ui/StudentIDCard";
import SquareButton from "@/components/ui/SquareButton";
import BottomNavBar from "@/components/ui/BottomNavBar";

const StudentIDPage: React.FC = () => {
  const handleGetNewID = () => {
    console.log("Get New ID clicked");
    // TODO: Implement logic for getting a new ID
  };

  const handleReplaceID = () => {
    console.log("Replace ID clicked");
    // TODO: Implement logic for replacing ID
  };

  const handleCardBalance = () => {
    console.log("Card Balance clicked");
    // TODO: Implement logic for checking card balance
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header title="Student ID" isHomeScreen={false} />

      <main className="flex-grow p-4 space-y-6 pt-16">
        <StudentIDCard
          name="John Doe"
          idNumber="#123456789"
          email="johndoe@cofc.edu"
          photoUrl="/ssc-logo.png"
        />

        <div className="flex justify-between">
          <SquareButton
            icon={<UserSquare2 size={24} />}
            label="Get New ID"
            onClick={handleGetNewID}
            size={100}
          />
          <SquareButton
            icon={<Mail size={24} />}
            label="Replace ID"
            onClick={handleReplaceID}
            size={100}
          />
          <SquareButton
            icon={<Banknote size={24} />}
            label="Card Balance"
            onClick={handleCardBalance}
            size={100}
          />
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default StudentIDPage;
