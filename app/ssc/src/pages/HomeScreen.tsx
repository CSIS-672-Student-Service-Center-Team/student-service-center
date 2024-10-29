import Image from 'next/image'
import { Bell, Home, LogOut, User } from 'lucide-react'

export default function HomeScreen({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <button onClick={onLogout} className="bg-red-800 text-white p-2 rounded-lg flex flex-col items-center">
              <LogOut size={24} />
              <span className="text-xs mt-1">Logout</span>
            </button>
          </div>
          <h1 className="text-xl font-bold text-red-800 absolute left-1/2 transform -translate-x-1/2">Home</h1>
          <div className="w-[64px]"></div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="bg-red-800 mt-4 p-4 rounded-lg flex items-center">
          <Image
            src="/placeholder.svg"
            alt="Profile"
            width={60}
            height={60}
            className="rounded-full mr-4"
          />
          <div>
            <p className="text-white font-semibold">Name</p>
            <p className="text-white text-sm">#ID Number</p>
            <p className="text-white text-sm">Email@cofc.edu</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <button className="bg-red-800 text-white p-4 rounded-lg flex flex-col items-center justify-center">
            <span className="text-2xl mb-1">P</span>
            <span className="text-xs">Parking</span>
          </button>
          <button className="bg-red-800 text-white p-4 rounded-lg flex flex-col items-center justify-center">
            <span className="text-2xl mb-1">🍽️</span>
            <span className="text-xs">Dining</span>
          </button>
          <button className="bg-red-800 text-white p-4 rounded-lg flex flex-col items-center justify-center">
            <span className="text-2xl mb-1">🆔</span>
            <span className="text-xs">ID</span>
          </button>
        </div>
      </div>

      <div className="bg-red-800 p-2 flex justify-between mt-4">
        <button className="text-white p-2">
          <Home />
        </button>
        <button className="text-white p-2">
          <Bell />
        </button>
        <button className="text-white p-2">
          <User />
        </button>
      </div>
    </div>
  )
}