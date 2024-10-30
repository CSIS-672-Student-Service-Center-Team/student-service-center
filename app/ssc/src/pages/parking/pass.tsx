"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import ParkingPass from "@/components/ui/parkingPass";
import ParkingPassButton from "@/components/ui/parkingActionButton";

export default function ParkingPassPage() {
  const router = useRouter();

  const handleGetPass = () => {
    // Implement get pass functionality
    console.log("Get a parking pass");
  };

  const handleReturnPass = () => {
    // Implement return pass functionality
    console.log("Return a parking pass");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Parking Pass" />

      <main className="flex-1 flex flex-col p-6 mb-20">
        <h2 className="text-2xl font-bold mb-6">Manage your parking passes:</h2>

        <ParkingPass
          type="Fall Pass"
          status="Active"
          expirationDate="12/20/2024"
        />
        <ParkingPass
          type="Summer Pass"
          status="Expired"
          expirationDate="06/20/2024"
        />

        <div className="mt-8">
          <ParkingPassButton
            label="Get A Parking Pass"
            onClick={handleGetPass}
          />
          <ParkingPassButton
            label="Return A Parking Pass"
            onClick={handleReturnPass}
          />
        </div>
      </main>

      <NavBar />
    </div>
  );
}
