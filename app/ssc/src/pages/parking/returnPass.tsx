"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParkingLocationProps {
  name: string;
}

const parkingLocations: ParkingLocationProps[] = [
  { name: "St. Phillip's Street Garage" },
  { name: "George Street Garage" },
  { name: "Wentworth Street Garage" },
  { name: "Aquarium Garage" },
  { name: "Calhoun Street Garage" },
  { name: "Marion Square Garage" },
  { name: "Visitor's Center Garage" },
];

export default function ReturnParkingPassPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const router = useRouter();

  const handleReturnPass = () => {
    if (selectedLocation) {
      setIsConfirming(true);
    }
  };

  const handleConfirm = () => {
    // Here you would typically make an API call to process the return
    router.push("/parking");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="Return Parking Pass" isHomeScreen={false} />

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8 mb-20 pt-20">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardContent className="p-6">
            {!isConfirming ? (
              <>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Select Pass Location:
                </h2>
                <div className="space-y-2">
                  {parkingLocations.map((location) => (
                    <button
                      key={location.name}
                      onClick={() => setSelectedLocation(location.name)}
                      className={cn(
                        "w-full flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors",
                        selectedLocation === location.name &&
                          "bg-gray-100 border-[#841414]"
                      )}
                    >
                      <span className="text-left">{location.name}</span>
                      {selectedLocation === location.name && (
                        <Check className="h-5 w-5 text-[#841414]" />
                      )}
                    </button>
                  ))}
                </div>

                <Button
                  onClick={handleReturnPass}
                  disabled={!selectedLocation}
                  className={cn(
                    "w-full mt-8 bg-[#841414] hover:bg-[#9a1818] text-white text-lg py-6 rounded-full transition-all",
                    !selectedLocation && "opacity-50 cursor-not-allowed"
                  )}
                >
                  Return Pass
                </Button>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Confirm Pass Return
                </h2>
                <p className="mb-6 text-gray-600">
                  Are you sure you want to return your parking pass for{" "}
                  {selectedLocation}? You will be refunded a pro-rated amount.
                </p>
                <div className="space-x-4">
                  <Button
                    onClick={() => setIsConfirming(false)}
                    variant="outline"
                    className="px-6 py-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    className="px-6 py-2 bg-[#841414] hover:bg-[#9a1818] text-white"
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <NavBar />
    </div>
  );
}
