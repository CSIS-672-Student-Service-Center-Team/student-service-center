import React, { useState } from "react";
import { useRouter } from "next/router";
import { Bell, Home, User } from "lucide-react";

// NotificationDropdown Component
const NotificationDropdown = ({ notifications }) => {
  return (
    <div className="absolute bottom-12 right-0 w-64 bg-white shadow-lg rounded-lg border border-gray-200 p-4 z-50">
      <h3 className="text-sm font-bold text-gray-700">Notifications</h3>
      <ul className="mt-2 space-y-2">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={`p-3 rounded-md ${
              notification.type === "warning"
                ? "bg-red-100 text-red-900"
                : notification.type === "info"
                ? "bg-gray-100 text-gray-900"
                : "bg-green-100 text-green-900"
            }`}
          >
            {notification.message}
          </li>
        ))}
      </ul>
      {notifications.length === 0 && (
        <p className="text-gray-500 text-sm">No notifications available.</p>
      )}
    </div>
  );
};

// Navbar Component
const NavBar = () => {
  const router = useRouter();
  
  // Notifications state
  const [notifications] = useState([
    { id: "1", type: "warning", message: "You have received a parking ticket!" },
    { id: "2", type: "info", message: "New meal plans are available!" },
    { id: "3", type: "success", message: "Your new student ID has been delivered!" },
    { id: "4", type: "info", message: "New update for your student portal!" }, // Example notification
  ]);

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => setIsHovered(true);
  const handleLeave = () => setIsHovered(false);

  const handleBellClick = () => {
    router.push("/notification"); // Navigate to the notifications page
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center py-3 z-50 space-x-6">
      {/* Home Icon */}
      <button
        onClick={() => router.push("/home")}
        className="text-gray-700 hover:text-gray-900 focus:outline-none transform transition-transform hover:scale-110"
        aria-label="Go to Home"
      >
        <Home className="h-6 w-6" />
      </button>

      {/* Notifications Icon */}
      <div
        className="relative group"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <button
          onClick={handleBellClick}
          className="text-gray-700 hover:text-gray-900 focus:outline-none transform transition-transform hover:scale-110"
          aria-label="View Notifications"
        >
          <Bell className="h-6 w-6" />
          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>
        {isHovered && <NotificationDropdown notifications={notifications} />}
      </div>

      {/* Profile Icon */}
      <button
        onClick={() => router.push("/profile")}
        className="text-gray-700 hover:text-gray-900 focus:outline-none transform transition-transform hover:scale-110"
        aria-label="Go to Profile"
      >
        <User className="h-6 w-6" />
      </button>
    </nav>
  );
};

export default NavBar;
