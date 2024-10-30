import { useRouter } from "next/navigation";
import Image from "next/image";
import SquareButton from "@/components/ui/sqButton";
import NavBar from "@/components/ui/navBar";
import Header from "@/components/ui/pageHeader";
import IdCard from "@/components/ui/idCard";

export default function HomeScreen({ onLogout }: { onLogout: () => void }) {
  const router = useRouter();

  const handleParking = () => {
    console.log("Parking clicked");
    // TODO: Implement parking navigation logic
    router.push("/parking");
  };

  const handleDining = () => {
    console.log("Dining clicked");
    // TODO: Implement dining navigation logic
    router.push("/dining");
  };

  const handleID = () => {
    console.log("ID clicked");
    router.push("/id"); // Updated to match the correct route
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header title="Home" isHomeScreen={true} onLogout={onLogout} />

      <main className="flex-grow p-4 pt-16 space-y-6">
        <IdCard
          name="John Doe"
          idNumber="#123456789"
          email="johndoe@cofc.edu"
          photoUrl="/ssc-logo.png"
        />

        <div className="flex justify-between pt-16">
          <SquareButton
            icon={
              <Image
                src="/parking-button.png"
                alt="parking button logo"
                width={50}
                height={50}
              />
            }
            label="Parking"
            onClick={handleParking}
            size={120}
            labelStyle={{ fontSize: "20px" }}
          />
          <SquareButton
            icon={
              <Image
                src="/dining-button.png"
                alt="dining button logo"
                width={50}
                height={50}
              />
            }
            label="Dining"
            onClick={handleDining}
            size={120}
            labelStyle={{ fontSize: "20px" }}
          />
          <SquareButton
            icon={
              <Image
                src="/id-button.png"
                alt="id button logo"
                width={50}
                height={50}
              />
            }
            label="ID"
            onClick={handleID}
            size={120}
            labelStyle={{ fontSize: "20px" }}
          />
        </div>
      </main>

      <NavBar />
    </div>
  );
}
