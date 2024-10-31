"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import ActionButton from "@/components/ui/actionButton";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParkingLocationProps {
  name: string;
}

const ParkingLocation: React.FC<{
  location: ParkingLocationProps;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ location, isSelected, onSelect }) => (
  <button
    onClick={onSelect}
    className={cn(
      "w-full flex justify-between items-center py-4 px-3 border-b border-gray-200",
      isSelected ? "bg-gray-50" : "hover:bg-gray-50"
    )}
  >
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 border rounded flex items-center justify-center">
        {isSelected && <Check className="w-4 h-4 text-red-800" />}
      </div>
      <span className="text-lg">{location.name}</span>
    </div>
  </button>
);

interface PassActionButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const PassActionButton: React.FC<PassActionButtonProps> = ({
  label,
  onClick,
  disabled,
}) => (
  <button
    onClick={onClick}
    className={`w-full bg-white text-black text-xl font-normal py-4 px-8 rounded-full border-2 border-black shadow-[0_4px_8px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 active:scale-95 mb-4 ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
    disabled={disabled}
  >
    {label}
  </button>
);

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Confirmation</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <p className="mb-4">
          Are you sure you want to return your parking pass? You will be
          refunded a pro-rated amount.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ReturnParkingPassPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const parkingLocations: ParkingLocationProps[] = [
    { name: "St. Phillip's Street Garage" },
    { name: "George Street Garage" },
    { name: "Wentworth Street Garage" },
    { name: "Aquarium Garage" },
    { name: "Calhoun Street Garage" },
    { name: "Marion Square Garage" },
    { name: "Visitor's Center Garage" },
  ];

  const handleReturnPass = () => {
    if (selectedLocation) {
      setIsModalOpen(true);
    }
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    // Add any additional logic for confirming the return here
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Return Parking Pass" />

      <main className="flex-1 flex flex-col p-6 mb-20">
        <h2 className="text-2xl font-bold mb-4">Select Pass Location:</h2>
        <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
          {parkingLocations.map((location) => (
            <ParkingLocation
              key={location.name}
              location={location}
              isSelected={selectedLocation === location.name}
              onSelect={() => setSelectedLocation(location.name)}
            />
          ))}
        </div>

        <div className="mt-auto">
          <PassActionButton
            label="Return Pass"
            onClick={handleReturnPass}
            disabled={!selectedLocation}
            className={cn(!selectedLocation && "opacity-50 cursor-not-allowed")}
          />
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />

      <NavBar />
    </div>
  );
}
