"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, MapPin, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
  activeView: "map" | "list";
  onViewChange: (view: "map" | "list") => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({
  activeView,
  onViewChange,
}) => (
  <div className="inline-flex rounded-lg overflow-hidden border border-[#841414] mb-6">
    <button
      onClick={() => onViewChange("map")}
      className={cn(
        "flex items-center justify-center py-2 px-4 text-sm font-medium transition-colors",
        activeView === "map"
          ? "bg-[#841414] text-white"
          : "bg-white text-[#841414] hover:bg-[#841414] hover:text-white"
      )}
    >
      <MapPin className="mr-2 h-4 w-4" />
      Map View
    </button>
    <button
      onClick={() => onViewChange("list")}
      className={cn(
        "flex items-center justify-center py-2 px-4 text-sm font-medium transition-colors",
        activeView === "list"
          ? "bg-[#841414] text-white"
          : "bg-white text-[#841414] hover:bg-[#841414] hover:text-white"
      )}
    >
      <List className="mr-2 h-4 w-4" />
      List View
    </button>
  </div>
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
      "w-full flex justify-between items-center py-4 px-4 border-b border-gray-200 transition-colors",
      isSelected ? "bg-gray-50" : "hover:bg-gray-50"
    )}
  >
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 border border-[#841414] rounded flex items-center justify-center">
        {isSelected && <Check className="w-4 h-4 text-[#841414]" />}
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
        "px-3 py-1 rounded-full text-sm font-medium",
        location.status === "Full"
          ? "bg-red-100 text-red-800"
          : location.status === "Limited"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-green-100 text-green-800"
      )}
    >
      {location.status === "Full" ? "FULL" : location.spaces}
    </span>
  </button>
);

export default function Component() {
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
    router.push("/checkout?price=250&type=parking&from=getPass");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="Get Parking Pass" isHomeScreen={false} />

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8 mb-20 pt-20">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardContent className="p-8">
            <div className="flex justify-center mb-8">
              <ViewToggle
                activeView={activeView}
                onViewChange={setActiveView}
              />
            </div>

            <div className="mb-8">
              {activeView === "map" ? (
                <div className="space-y-6">
                  <Image
                    src="/parking-availability-map.png"
                    alt="Campus Parking Map"
                    width={1000}
                    height={750}
                    className="w-full h-auto rounded-lg border border-gray-200"
                  />
                  <Button
                    onClick={() => setActiveView("list")}
                    className="w-full bg-[#841414] hover:bg-[#9a1818] text-white py-3"
                  >
                    Select Location
                  </Button>
                </div>
              ) : (
                <div className="rounded-lg overflow-hidden border border-gray-200">
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

            <Button
              onClick={handleCheckout}
              disabled={!selectedLocation}
              className={cn(
                "w-full bg-[#841414] hover:bg-[#9a1818] text-white text-lg py-6 rounded-full transition-all",
                !selectedLocation && "opacity-50 cursor-not-allowed"
              )}
            >
              {selectedLocation
                ? `Checkout - ${selectedLocation}`
                : "Select a location"}
            </Button>
          </CardContent>
        </Card>
      </main>

      <NavBar />
    </div>
  );
}
