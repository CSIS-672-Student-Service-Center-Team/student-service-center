"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import BottomNavBar from "@/components/ui/navBar";

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

interface GarageLotProps {
  name: string;
  status: "Available" | "Full" | "Limited";
}

const GarageLot: React.FC<GarageLotProps> = ({ name, status }) => (
  <div className="flex justify-between items-center mb-2 text-xl">
    <span>-{name}</span>
    <span>| Status: {status}</span>
  </div>
);

const ActionButton: React.FC<{ label: string; onClick: () => void }> = ({
  label,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="w-full bg-white text-black text-xl font-normal py-4 px-8 rounded-full border-2 border-black shadow-[0_4px_8px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 active:scale-95 mb-4"
  >
    {label}
  </button>
);

export default function ParkingAvailabilityPage() {
  const [activeView, setActiveView] = useState<"map" | "list">("list");
  const router = useRouter();

  const handleFilterOptions = () => {
    // Implement filter options functionality
    console.log("Open filter options");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Parking Availability" />

      <main className="flex-1 flex flex-col p-6 mb-20">
        <ViewToggle activeView={activeView} onViewChange={setActiveView} />

        <div className="mb-6">
          {activeView === "list" ? (
            <Image
              src="/parking-availability-list.png"
              alt="Parking Locations and Time Restrictions"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          ) : (
            <Image
              src="/parking-availability-map.png"
              alt="Parking Availability Map"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Garage Lot Status:</h2>
          <GarageLot name="St. Phillip's" status="Available" />
          <GarageLot name="George St." status="Full" />
          <GarageLot name="Aquarium" status="Limited" />
        </div>

        <div className="mt-auto">
          <ActionButton label="Filter Options" onClick={handleFilterOptions} />
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}
