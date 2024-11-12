"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import ActionButton from "@/components/ui/actionButton";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
  activeView: "map" | "list";
  onViewChange: (view: "map" | "list") => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({
  activeView,
  onViewChange,
}) => (
  <div className="flex rounded-lg overflow-hidden border border-red-800 mb-6">
    <button
      onClick={() => onViewChange("map")}
      className={`flex-1 py-2 px-6 text-lg ${
        activeView === "map" ? "bg-red-800 text-white" : "bg-white text-red-800"
      }`}
    >
      Map View
    </button>
    <button
      onClick={() => onViewChange("list")}
      className={`flex-1 py-2 px-6 text-lg ${
        activeView === "list"
          ? "bg-red-800 text-white"
          : "bg-white text-red-800"
      }`}
    >
      List View
    </button>
  </div>
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

interface ParkingLocationProps {
  name: string;
  status: "Available" | "Full" | "Limited";
  spaces?: number;
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
      <span
        className={cn(
          "text-lg",
          location.status === "Full" ? "text-gray-400" : "text-black"
        )}
      >
        {location.name}
      </span>
    </div>
    <span
      className={cn(
        "px-3 py-1 rounded-md text-white font-medium",
        location.status === "Full" ? "bg-red-500" : "bg-green-500"
      )}
    >
      {location.status === "Full" ? "Full" : location.spaces}
    </span>
  </button>
);

export default function GetParkingPassPage() {
  const [activeView, setActiveView] = useState<"map" | "list">("map");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const router = useRouter();

  const parkingLocations: ParkingLocationProps[] = [
    { name: "St. Phillip's", status: "Available", spaces: 23 },
    { name: "George St.", status: "Full" },
    { name: "Aquarium", status: "Available", spaces: 5 },
    { name: "Calhoun Street", status: "Limited", spaces: 3 },
    { name: "Marion Square", status: "Available", spaces: 15 },
    { name: "Visitor's Center", status: "Available", spaces: 12 },
  ];

  const handleCheckout = () => {
    router.push("/checkout?price=$500&type=parking&from=getPass");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Parking Pass" />

      {/* <main className="flex-1 flex flex-col p-6 mb-20"> */}
      <main className="content">
        <ViewToggle activeView={activeView} onViewChange={setActiveView} />

        <div className="flex-1 mb-6 flex flex-col">
          {activeView === "map" ? (
            <div className="flex-1 flex flex-col space-y-4">
              <Image
                src="/parking-availability-map.png"
                alt="Campus Parking Map"
                width={800}
                height={1200}
                className="w-full h-auto rounded-lg border border-gray-200 flex-1"
              />
              <div className="mt-auto">
                <ActionButton
                  label="Select Location"
                  onClick={() => setActiveView("list")}
                />
              </div>
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden border border-gray-200 flex-1">
              {parkingLocations.map((location) => (
                <ParkingLocation
                  key={location.name}
                  location={location}
                  isSelected={selectedLocation === location.name}
                  onSelect={() => {
                    if (location.status !== "Full") {
                      setSelectedLocation(location.name);
                    }
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto">
          <PassActionButton
            label="Checkout"
            onClick={handleCheckout}
            disabled={!selectedLocation}
            className={cn(!selectedLocation && "opacity-50 cursor-not-allowed")}
          />
        </div>
      </main>

      <NavBar />
    </div>
  );
}
