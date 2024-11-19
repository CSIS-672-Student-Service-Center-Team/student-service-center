'use client'

import { useRouter } from "next/navigation"
import Header from "@/components/ui/pageHeader"
import NavBar from "@/components/ui/navBar"
import { Car, Ticket, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import ButtonWrapper from "@/components/ui/ButtonWrapper";

export default function ParkingPage() {
    const router = useRouter()

    const handleNavigation = (path: string) => {
        router.push(path)
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header title="Parking Services" isHomeScreen={false} />

            <main className="flex-1 p-6 pt-20 pb-24">

                <div className="flex flex-col gap-6">
                    <ButtonWrapper onClick={() => handleNavigation("/parking/pass")}>
                        <Car className="w-12 h-12 text-[#8B1A1A]" />
                        <span className="text-lg font-medium text-[#8B1A1A]">MANAGE PARKING PASS</span>
                    </ButtonWrapper>

                    <ButtonWrapper onClick={() => handleNavigation("/parking/tickets")}>
                        <Ticket className="w-12 h-12 text-[#8B1A1A]" />
                        <span className="text-lg font-medium text-[#8B1A1A]">PARKING TICKETS</span>
                    </ButtonWrapper>

                    <ButtonWrapper onClick={() => handleNavigation("/parking/availability")}>
                        <MapPin className="w-12 h-12 text-[#8B1A1A]" />
                        <span className="text-lg font-medium text-[#8B1A1A]">PARKING AVAILABILITY</span>
                    </ButtonWrapper>
                </div>
            </main>

            <NavBar />
        </div>
    )
}