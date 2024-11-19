"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import IdCard from "@/components/ui/idCard";
import { Car, Utensils, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HomeScreen({ onLogout }: { onLogout: () => void }) {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const ButtonWrapper = ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "w-full h-40 bg-white border-2 border-[#8B1A1A] rounded-2xl",
        "shadow-lg hover:shadow-xl transition-shadow",
        "flex flex-col items-center justify-center gap-2",
        "p-4"
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Home" isHomeScreen={true} onLogout={onLogout} />

      <main className="flex-1 p-6 pt-20 pb-24">
        <IdCard
          name="John Doe"
          idNumber="#123456789"
          email="johndoe@cofc.edu"
          photoUrl="/Student_ID_Photo.jpg"
        />

        <div className="flex flex-col gap-6 mt-6">
          <ButtonWrapper onClick={() => handleNavigation("/parking")}>
            <Car className="w-12 h-12 text-[#8B1A1A]" />
            <span className="text-lg font-medium text-[#8B1A1A]">PARKING</span>
          </ButtonWrapper>

          <ButtonWrapper
            onClick={() => handleNavigation("/dining/dining-page")}
          >
            <Utensils className="w-12 h-12 text-[#8B1A1A]" />
            <span className="text-lg font-medium text-[#8B1A1A]">DINING</span>
          </ButtonWrapper>

          <ButtonWrapper onClick={() => handleNavigation("/id")}>
            <CreditCard className="w-12 h-12 text-[#8B1A1A]" />
            <span className="text-lg font-medium text-[#8B1A1A]">ID</span>
          </ButtonWrapper>
        </div>
      </main>

      <NavBar />
    </div>
  );
}
