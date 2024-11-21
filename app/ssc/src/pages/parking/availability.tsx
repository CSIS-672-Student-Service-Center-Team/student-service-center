"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import Map from "@/components/ui/map";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import ActionButton from "@/components/ui/actionButton";
import { Space } from "lucide-react";

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

interface ContinueButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-white text-black text-xl font-normal py-4 px-8 rounded-full border-2 border-black shadow-[0_4px_8px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 active:scale-95 mb-4"
  >
    {label}
  </button>
);

interface GarageLotProps {
  name: string;
  status: "Available" | "Full" | "Limited";
  spaces?: number;
  location: {
    lat: number;
    lng: number;
  };
}

const ParkingLocation: React.FC<{
  garage: GarageLotProps;
  onClick: () => void;
}> = ({ garage, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex justify-between items-center py-4 px-3 border-b border-gray-200 hover:bg-gray-50"
  >
    <span className="text-lg">{garage.name}</span>
    <span
      className={cn(
        "px-3 py-1 rounded-md text-white font-medium",
        garage.status === "Full" ? "bg-red-500" : "bg-green-500"
      )}
    >
      {garage.status === "Full" ? "Full" : garage.spaces}
    </span>
  </button>
);

export default function ParkingAvailabilityPage() {
  const [activeView, setActiveView] = useState<"map" | "list">("list");
  const [selectedGarage, setSelectedGarage] = useState("");
  const router = useRouter();



  const garages: GarageLotProps[] = [
    {
      name: "St. Philip's Street Garage",
      status: "Available",
      spaces: 23,
      location: { lat: 32.7839, lng: -79.9371 },
    },
    {
      name: "George Street Garage",
      status: "Full",
      location: { lat: 32.7845, lng: -79.9373 },
    },
    {
      name: "Wentworth Street Garage",
      status: "Available",
      spaces: 15,
      location: { lat: 32.7836, lng: -79.9346 },
    },
    {
      name: "Aquarium Garage",
      status: "Available",
      spaces: 5,
      location: { lat: 32.7904, lng: -79.9259 },
    },
    {
      name: "Calhoun Street Garage",
      status: "Limited",
      spaces: 3,
      location: { lat: 32.7847, lng: -79.9402 },
    },
    {
      name: "Marion Square Garage",
      status: "Full",
      location: { lat: 32.787, lng: -79.9379 },
    },
    {
      name: "Visitor's Center Garage",
      status: "Available",
      spaces: 12,
      location: { lat: 32.7881, lng: -79.9393 },
    },
  ];

  const handleGarageSelect = (garage: string) => {
    setSelectedGarage(garage);
    setActiveView("map");
  };



  const selectedGarageData =
    garages.find((garage) => garage.name === selectedGarage) || null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Parking Availability"  />

      <main className="flex-1  flex-col p-6 mb-20">
        <div className="h-36" />
        <ViewToggle activeView={activeView} onViewChange={setActiveView} />

        {activeView === "map" && (
          <div className="mb-6">
            <Select value={selectedGarage} onValueChange={handleGarageSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {garages.map((garage) => (
                  <SelectItem key={garage.name} value={garage.name}>
                    <div className="flex justify-between items-center w-full">
                      <span>{garage.name}</span>
                      <span
                        className={cn(
                          "ml-2 px-2 py-0.5 rounded text-white text-sm",
                          garage.status === "Full"
                            ? "bg-red-500"
                            : "bg-green-500"
                        )}
                      >
                        {garage.status === "Full" ? "Full" : garage.spaces}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="mb-6">
          {activeView === "list" ? (
            <div className="rounded-lg overflow-hidden border border-gray-200">
              {garages.map((garage) => (
                <ParkingLocation
                  key={garage.name}
                  garage={garage}
                  onClick={() => handleGarageSelect(garage.name)}
                />
              ))}
            </div>
          ) : (
            <Map selectedGarage={selectedGarageData} />
          )}
          {selectedGarageData && (
            <div className="mt-4">
              <ActionButton
                label="Start"
                onClick={() =>
                  console.log("Start navigation to", selectedGarageData.name)
                }
              />
            </div>
          )}
        </div>
      </main>

      <NavBar />
    </div>
  );
}
