import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import BottomNavBar from "@/components/ui/navBar";
import ParkingButton from "@/components/ui/parkingButton";

export default function ParkingPage() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Student ID" isHomeScreen={false} />

      <main className="flex-1 flex flex-col items-center justify-center gap-8 p-6 mb-20">
        <ParkingButton
          label="Manage Parking Pass"
          onClick={() => handleNavigation("/parking/pass")}
        />
        <ParkingButton
          label="Parking Tickets"
          onClick={() => handleNavigation("/parking/tickets")}
        />
        <ParkingButton
          label="Parking Availability"
          onClick={() => handleNavigation("/parking/availability")}
        />
      </main>

      <BottomNavBar />
    </div>
  );
}