"use client";

import React, { useState, useRef } from "react";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import BottomNavBar from "@/components/ui/navBar";
import IdCard from "@/components/ui/idCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewStudentIDPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setUploadedFileName(file.name);
    }
  };

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  const handleContinue = () => {
    if (selectedImage) {
      router.push(
        `/newid-pickup-delivery?photoUrl=${encodeURIComponent(selectedImage)}`
      );
    } else {
      router.push("/newid-pickup-delivery");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="New Student ID" isHomeScreen={false} />

      <main className="flex-grow p-4 space-y-6 pt-20 pb-24">
        <div className="w-full max-w-md mx-auto">
          <IdCard
            name="John Doe"
            idNumber="#123456789"
            email="johndoe@cofc.edu"
            photoUrl={selectedImage || "/Student_ID_Photo.jpg"}
          />
        </div>

        <div className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <Input
              id="photo-upload"
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <Button
              onClick={handleChooseImage}
              variant="outline"
              className="w-full max-w-md py-6 text-xl font-medium bg-white hover:bg-gray-100 text-[#841414] rounded-full border-2 border-[#841414] transition-colors"
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              Choose From Library
            </Button>
            {uploadedFileName && (
              <span className="text-sm text-gray-600 truncate max-w-[300px]">
                {uploadedFileName}
              </span>
            )}
          </div>

          <div className="w-full max-w-md mx-auto h-16 rounded-full bg-[#841414] hover:bg-[#9a1818] transition-colors overflow-hidden">
            <button
              onClick={handleContinue}
              className="w-full h-full flex items-center justify-center text-xl font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#841414]"
            >
              {selectedImage
                ? "Continue with New Photo"
                : "Continue with Current Photo"}
            </button>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default NewStudentIDPage;
