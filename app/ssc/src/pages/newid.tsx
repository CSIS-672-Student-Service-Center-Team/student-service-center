"use client";

import React, { useState, useRef } from "react";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import BottomNavBar from "@/components/ui/navBar";
import StudentIDCard from "@/components/ui/idCard";
import { Button } from "@/components/ui/button";

const NewStudentIDPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  const handleContinue = () => {
    // Add navigation logic here
    console.log("Continuing to next page...");
    // router.push('/next-page');
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header title="New Student ID" />

      <main className="flex-grow p-4 space-y-6 pt-16">
        <StudentIDCard
          name="John Doe"
          idNumber="#123456789"
          email="johndoe@cofc.edu"
          photoUrl={selectedImage || "/placeholder.svg"}
        />

        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <Button
              onClick={handleChooseImage}
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 rounded-full border-2"
            >
              <ImageIcon className="w-5 h-5" />
              Choose From Library
            </Button>
          </div>

          {selectedImage && (
            <div className="flex justify-center items-center">
              <Button
                onClick={handleContinue}
                className="w-[200px] py-6 text-lg font-medium bg-green-100 hover:bg-green-200 text-green-800 rounded-full text-center"
              >
                Continue
              </Button>
            </div>
          )}
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default NewStudentIDPage;
