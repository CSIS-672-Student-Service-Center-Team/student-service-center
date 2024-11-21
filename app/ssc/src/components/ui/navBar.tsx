import React, { useState, useEffect } from "react";
import { Home, Bell, User } from "lucide-react";
import { useRouter } from "next/router";
import { useNotification } from "@/context/NotificationContext";
import { mockNotifications } from "@/mocks/mockNotifications";
import { Notification } from "@/lib/notification"

const NavBar: React.FC = () => {
  const router = useRouter();
  const { unreadCount, setUnreadCount } = useNotification();
  const [ notifications, setNotifications] = useState<Notification[]>(mockNotifications);  

  useEffect(() => {
    const newUnreadCount = notifications.filter((n) => !n.isRead).length;
    setUnreadCount(newUnreadCount);
  }, [notifications, setUnreadCount]);
  
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
        className="text-white flex-1 flex justify-center relative"
        onClick={() => handleNavigation("/notification")}
      >
        <Bell size={32} />
        {unreadCount > 0 && (
          <span className="absolute bottom-5 right-11 bg-yellow-400 text-red-800 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold animate-bounce">
            {unreadCount}
          </span>
        )}
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
