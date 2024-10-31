import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Bell, User } from "lucide-react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

const ViewBalancePage: React.FC = () => {
  const router = useRouter()
  const [displayBalance, setDisplayBalance] = useState(0)
  const targetBalance = 123.99
  
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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-red-900 text-white px-4 py-4 flex items-center">
        <button 
          onClick={() => router.back()}
          className="mr-4"
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Go back</span>
        </button>
        <h1 className="text-xl font-semibold">Student Card Balance</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 pt-12">
        <h2 className="text-2xl mb-8">Current Balance</h2>
        <div className="text-6xl font-bold mb-12">
          ${displayBalance.toFixed(2)}
        </div>
        <Button 
          variant="outline" 
          className="w-full max-w-xs rounded-full border-2"
          onClick={() => router.push('/balance/add-funds')}
        >
          Add Funds
        </Button>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-red-900 text-white grid grid-cols-3 fixed bottom-0 w-full">
        <button 
          className="flex flex-col items-center justify-center py-4"
          onClick={() => router.push('/dashboard')}
        >
          <Home className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </button>
        <button 
          className="flex flex-col items-center justify-center py-4 relative"
          onClick={() => router.push('/notifications')}
        >
          <Bell className="h-6 w-6" />
          <div className="absolute top-3 right-[calc(50%-12px)] w-2 h-2 bg-yellow-400 rounded-full" />
          <span className="sr-only">Notifications</span>
        </button>
        <button 
          className="flex flex-col items-center justify-center py-4"
          onClick={() => router.push('/profile')}
        >
          <User className="h-6 w-6" />
          <span className="sr-only">Profile</span>
        </button>
      </nav>

      {/* Bottom Spacing for Fixed Navigation */}
      <div className="h-[72px]" />
    </div>
  )
};

export default ViewBalancePage