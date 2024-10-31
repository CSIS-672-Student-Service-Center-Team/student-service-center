import { Button } from "@/components/ui/button"
import ActionButton from "@/components/ui/actionButton"
import Header from "@/components/ui/pageHeader"
import NavBar from "@/components/ui/navBar"
import { ArrowLeft, Home, Bell, User } from "lucide-react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"


const ViewBalancePage: React.FC = () => {
  const router = useRouter()
  //  TODO: add some user values here
  //  
  const [displayBalance, setDisplayBalance] = useState(0)
  const targetBalance = 123.99
  const handleAddFunds = () => {
    // TODO: navigate to "/balance/add"
    // Make sure to give current balance
    router.push("/balance/add")
  };
  useEffect(() => {
    // Animate the balance counting up
    const duration = 1000 // 1 second animation
    const steps = 60 // 60 steps (for smooth animation)
    const increment = targetBalance / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= targetBalance) {
        setDisplayBalance(targetBalance)
        clearInterval(timer)
      } else {
        setDisplayBalance(current)
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [])

  return (
<div className="flex flex-col h-screen bg-white">
      <Header title="Student ID" isHomeScreen={false} />
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 pt-12">
        <h2 className="text-2xl mb-8">Current Balance</h2>
        <div className="text-6xl font-bold mb-12">
          ${displayBalance.toFixed(2)}
        </div>
        <ActionButton
          label="Add Funds"
          onClick={handleAddFunds}
        />
      </main>
      <NavBar />
    </div>
  )
};

export default ViewBalancePage;