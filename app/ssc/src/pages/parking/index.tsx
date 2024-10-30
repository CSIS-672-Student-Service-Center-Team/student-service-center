import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import ParkingActionButton from "@/components/ui/parkingActionButton";

export default function ParkingPage() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Student ID" isHomeScreen={false} />

      <main className="flex-1 flex flex-col items-center justify-center gap-8 p-6 mb-20">
        <ParkingActionButton
          label="Manage Parking Pass"
          onClick={() => handleNavigation("/parking/pass")}
        />
        <ParkingActionButton
          label="Parking Tickets"
          onClick={() => handleNavigation("/parking/tickets")}
        />
        <ParkingActionButton
          label="Parking Availability"
          onClick={() => handleNavigation("/parking/availability")}
        />
      </main>

      <NavBar />
    </div>
  );
}
