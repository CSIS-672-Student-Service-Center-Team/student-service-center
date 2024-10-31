import Header from "@/components/ui/pageHeader"
import NavBar from "@/components/ui/navBar"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"

const AddBalancePage: React.FC = () => {
    const router = useRouter()

    const [currentBalance, setCurrentBalance] = useState(0)
    return (
        <div className="flex flex-col h-screen bg-white">
            <Header title="Add Balance" isHomeScreen={false} />
            <main className="flex-1 flex flex-col items-center px-4 pt-12">
                <h2 className="text-2x1 mb-8">Current Balance</h2>
            </main>
            <NavBar />
        </div>
    )
};

export default AddBalancePage;