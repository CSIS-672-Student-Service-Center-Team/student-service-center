import React from "react";
import Image from "next/image";
import { UserSquare2, Mail, Banknote } from "lucide-react";
import Header from "@/components/ui/pageHeader";
import StudentIDCard from "@/components/ui/idCard";
import SquareButton from "@/components/ui/sqButton";
import BottomNavBar from "@/components/ui/navBar";

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
            icon={
              <Image
                src="/id-button.png"
                alt="id button logo"
                width={50}
                height={50}
              />
            }
            label="Get New ID"
            onClick={handleGetNewID}
            size={120}
            labelStyle={{ fontSize: "20px" }}
          />
          <SquareButton
            icon={
              <Image
                src="/mail-button.png"
                alt="mail button logo"
                width={50}
                height={50}
              />
            }
            label="Replace ID"
            onClick={handleReplaceID}
            size={120}
            labelStyle={{ fontSize: "20px" }}
          />
          <SquareButton
            icon={
              <Image
                src="/cash-button.png"
                alt="cash button logo"
                width={50}
                height={50}
              />
            }
            label="Card Balance"
            onClick={handleReplaceID}
            size={120}
            labelStyle={{ fontSize: "20px" }}
          />
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
};

export default StudentIDPage;
