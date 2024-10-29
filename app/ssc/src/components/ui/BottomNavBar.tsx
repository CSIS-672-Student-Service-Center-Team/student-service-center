import React from "react";
import { Home, Bell, User } from "lucide-react";
import { useRouter } from "next/router";

const BottomNavBar: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-800 p-4 flex justify-between items-center rounded-t-3xl">
      <button
        className="text-white flex-1 flex justify-center"
        onClick={() => handleNavigation("/")}
      >
        <Home size={32} />
      </button>
      <div className="w-px h-12 bg-white"></div>
      <button
        className="text-white flex-1 flex justify-center"
        onClick={() => handleNavigation("/notifications")}
      >
        <Bell size={32} />
      </button>
      <div className="w-px h-12 bg-white"></div>
      <button
        className="text-white flex-1 flex justify-center"
        onClick={() => handleNavigation("/profile")}
      >
        <User size={32} />
      </button>
    </div>
  );
};

export default BottomNavBar;
