"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, PlusCircle, ArrowLeftCircle } from "lucide-react";

interface ParkingPassProps {
  type: string;
  status: "Active" | "Expired";
  expirationDate: string;
}

const ParkingPass: React.FC<ParkingPassProps> = ({
  type,
  status,
  expirationDate,
}) => (
  <Card className="mb-4 overflow-hidden">
    <CardHeader className="bg-[#841414] text-white p-4">
      <CardTitle className="flex justify-between items-center">
        <span>{type}</span>
        <Badge variant={status === "Active" ? "default" : "secondary"}>
          {status}
        </Badge>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      <div className="flex items-center text-sm text-gray-600">
        <CalendarIcon className="mr-2 h-4 w-4" />
        Expires: {expirationDate}
      </div>
    </CardContent>
  </Card>
);

export default function ParkingPassPage() {
  const router = useRouter();

  const handleGetPass = () => {
    console.log("Get a parking pass");
    router.push("/parking/getPass");
  };

  const handleReturnPass = () => {
    console.log("Return a parking pass");
    router.push("/parking/returnPass");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Parking Pass" />

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8 mb-20 pt-20">
        <h2 className="text-3xl font-bold mb-6 text-[#841414]">
          Manage Your Parking Passes
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
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
        </div>
        <div className="grid gap-6 md:grid-cols-2">
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
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Button
            onClick={handleGetPass}
            className="bg-[#841414] hover:bg-[#9a1818] text-white flex items-center justify-center"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Get A Parking Pass</span>
          </Button>
          <Button
            onClick={handleReturnPass}
            variant="outline"
            className="border-[#841414] text-[#841414] hover:bg-[#841414] hover:text-white flex items-center justify-center"
          >
            <ArrowLeftCircle className="mr-2 h-4 w-4" />
            <span>Return A Parking Pass</span>
          </Button>
        </div>
      </main>

      <NavBar />
    </div>
  );
}
