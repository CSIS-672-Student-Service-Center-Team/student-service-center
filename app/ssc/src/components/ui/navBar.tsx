import React from "react";
import { Home, Bell, User } from "lucide-react";
import { useRouter } from "next/router";
import { Notification } from "@/components/notifications/notification";
import { mockNotifications } from "@/mocks/mockNotes";

interface NavBarProps {
  notifications?: Array<Notification>;
}

const NavBar: React.FC<NavBarProps> = ({ notifications }) => {
  const router = useRouter();

  // Boilerplate for notes
  if (!notifications) {
    notifications = mockNotifications;
  }

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-800 p-4 flex justify-between items-center rounded-t-3xl">
      <button
        className="text-white flex-1 flex justify-center"
        onClick={() => handleNavigation("/home")}
      >
        <Home size={32} />
      </button>
      <div className="w-px h-12 bg-white"></div>
      <button
        className="text-white flex-1 flex justify-center"
        onClick={() => handleNavigation("/notification")}
      >
        <Bell size={32} /><div className="relative">
        {notifications && (<span className="absolute -top-4 -right-4  bg-blue-500 text-white text-xs rounded-full h-7 w-7 flex items-center justify-center">
          {notifications.length}
        </span>
        )}
        </div>
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

export default NavBar;
