"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import ActionButton from "@/components/ui/actionButton";
import { X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";
import Map from "@/components/ui/map";

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
  location: {
    lat: number;
    lng: number;
  };
}

const GarageLot: React.FC<GarageLotProps> = ({ name, status }) => (
  <div className="flex justify-between items-center mb-2 text-xl">
    <span>-{name}</span>
    <span>| Status: {status}</span>
  </div>
);

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  garages: GarageLotProps[];
  selectedGarage: string;
  onGarageSelect: (garage: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  garages,
  selectedGarage,
  onGarageSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Filter Options</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close filter options"
          >
            <X size={24} />
          </button>
        </div>
        <RadioGroup
          value={selectedGarage}
          onValueChange={onGarageSelect}
          className="space-y-4"
        >
          {garages.map((garage) => (
            <div
              key={garage.name}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
            >
              <Label
                htmlFor={garage.name}
                className="flex-1 cursor-pointer text-lg"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={garage.name} id={garage.name} />
                  <span className="ml-2">{garage.name}</span>
                </div>
              </Label>
              <span className="text-lg">| Status: {garage.status}</span>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default function ParkingAvailabilityPage() {
  const [activeView, setActiveView] = useState<"map" | "list">("list");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedGarage, setSelectedGarage] = useState("");
  const router = useRouter();

  const garages: GarageLotProps[] = [
    {
      name: "St. Philip's Street Garage",
      status: "Available",
      location: { lat: 32.7839, lng: -79.9371 },
    },
    {
      name: "George Street Garage",
      status: "Full",
      location: { lat: 32.7845, lng: -79.9373 },
    },
    {
      name: "Wentworth Street Garage",
      status: "Limited",
      location: { lat: 32.7836, lng: -79.9346 },
    },
    {
      name: "Aquarium Garage",
      status: "Available",
      location: { lat: 32.7904, lng: -79.9259 },
    },
    {
      name: "Calhoun Street Garage",
      status: "Limited",
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
      location: { lat: 32.7881, lng: -79.9393 },
    },
  ];

  const handleFilterOptions = () => {
    setIsFilterModalOpen(true);
  };

  const handleGarageSelect = (garage: string) => {
    setSelectedGarage(garage);
  };

  const selectedGarageData =
    garages.find((garage) => garage.name === selectedGarage) || null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Parking Availability" />

      <main className="flex-1 flex flex-col p-6 mb-20">
        <ViewToggle activeView={activeView} onViewChange={setActiveView} />

        <div className="mt-auto">
          <ActionButton label="Filter Options" onClick={handleFilterOptions} />
        </div>

        <div className="mb-6">
          {activeView === "list" ? (
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3">Garage</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {garages.map((garage) => (
                    <tr key={garage.name} className="border-t border-gray-300">
                      <td className="p-3">{garage.name}</td>
                      <td className="p-3">{garage.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Map selectedGarage={selectedGarageData} />
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Garage Lot Status:</h2>
          {selectedGarage ? (
            <GarageLot {...garages.find((g) => g.name === selectedGarage)!} />
          ) : (
            garages
              .slice(0, 3)
              .map((garage) => <GarageLot key={garage.name} {...garage} />)
          )}
        </div>
      </main>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        garages={garages}
        selectedGarage={selectedGarage}
        onGarageSelect={handleGarageSelect}
      />

      <NavBar />
    </div>
  );
}
