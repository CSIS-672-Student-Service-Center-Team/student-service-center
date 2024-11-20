import { Button } from "@/components/ui/button"
import ActionButton from "@/components/ui/actionButton"
import Header from "@/components/ui/pageHeader"
import NavBar from "@/components/ui/navBar"
import { ArrowLeft, Home, Bell, User } from "lucide-react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { currentUserId } from "@/lib/currentUser"

const ViewBalancePage: React.FC = () => {
  const router = useRouter()
  const [displayBalance, setDisplayBalance] = useState(0)

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(`/api/users?userId=${currentUserId}`)
        if (response.ok) {
          const data = await response.json()
          setDisplayBalance(data.balance)
        } else {
          console.error('Failed to fetch balance')
        }
      } catch (error) {
        console.error('Error fetching balance:', error)
      }
    }

    fetchBalance()
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
          onClick={() => {console.log("Add funds clicked")} }
        />
      </main>
      <NavBar />
    </div>
  )
}

export default ViewBalancePage