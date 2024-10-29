import { useRouter } from "next/navigation";
import Image from "next/image";
import SquareButton from "@/components/ui/SquareButton";
import BottomNavBar from "@/components/ui/BottomNavBar";
import Header from "@/components/ui/Header";
import StudentIDCard from "@/components/ui/StudentIDCard";

export default function HomeScreen({ onLogout }: { onLogout: () => void }) {
  const router = useRouter();

  const handleParking = () => {
    console.log("Parking clicked");
    // TODO: Implement parking navigation logic
    // router.push('/parking');
  };

  const handleDining = () => {
    console.log("Dining clicked");
    // TODO: Implement dining navigation logic
    // router.push('/dining');
  };

  const handleID = () => {
    console.log("ID clicked");
    router.push("/StudentIDPage"); // Updated to match the correct route
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header title="Home" isHomeScreen={true} onLogout={onLogout} />

      <main className="flex-grow p-4 pt-16 space-y-6">
        <StudentIDCard
          name="John Doe"
          idNumber="#123456789"
          email="johndoe@cofc.edu"
          photoUrl="/ssc-logo.png"
        />

        <div className="flex justify-between pt-16">
          <SquareButton
            icon="P"
            label="Parking"
            onClick={handleParking}
            size={120}
          />
          <SquareButton
            icon="🍽️"
            label="Dining"
            onClick={handleDining}
            size={120}
          />
          <SquareButton icon="🆔" label="ID" onClick={handleID} size={120} />
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}
