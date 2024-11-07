"use client";
import {useRouter} from "next/navigation";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import ParkingPass from "@/components/ui/parkingPass";
import ParkingPassButton from "@/components/ui/actionButton";
import {cn} from "@/lib/utils";
import {Car, Ticket} from "lucide-react";

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
    const ButtonWrapper = ({children, onClick}: { children: React.ReactNode, onClick: () => void }) => (
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
    )

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header title="Parking Pass"/>

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

                <div className="flex flex-col gap-6">
                    <ButtonWrapper onClick={() => handleGetPass()}>
                        {/* Getting a Parking Pass Icon */}
                        <svg
                            className="w-12 h-12 text-[#8B1A1A]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
                            <text x="12" y="12" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">P
                            </text>
                            <line x1="12" y1="17" x2="12" y2="20" stroke="white" strokeWidth="2"/>
                            <line x1="10" y1="18.5" x2="14" y2="18.5" stroke="white" strokeWidth="2"/>
                        </svg>
                        <span className="text-lg font-medium text-[#8B1A1A]">Get A Parking Pass</span>
                    </ButtonWrapper>

                    <ButtonWrapper onClick={() => handleReturnPass()}>
                        {/* Returning a Parking Pass Icon */}
                        <svg
                            className="w-12 h-12 text-[#8B1A1A]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
                            <text x="12" y="12" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">P
                            </text>
                            <path d="M12 17 L12 21 L10 19" stroke="white" strokeWidth="2" fill="none"/>
                        </svg>
                        <span className="text-lg font-medium text-[#8B1A1A]">Return A Parking Pass</span>
                    </ButtonWrapper>
                </div>
            </main>

            <NavBar/>
        </div>
    );
}
