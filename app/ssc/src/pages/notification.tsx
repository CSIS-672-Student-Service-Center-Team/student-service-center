import React, { useState } from "react";
import { ArrowLeft, Bell, Home, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";

interface Notification {
  id: string;
  type: "warning" | "info" | "success";
  message: string;
  dismissible?: boolean;
}

const NOTIFICATION_TYPES = {
  warning: "bg-red-100 border-red-400 text-red-800",
  info: "bg-blue-100 border-blue-400 text-blue-800",
  success: "bg-green-100 border-green-400 text-green-800",
};

const NotificationPage = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", type: "warning", message: "You have received a parking ticket!", dismissible: false },
    { id: "2", type: "info", message: "New meal plans are available!", dismissible: true },
    { id: "3", type: "warning", message: "Your card balance is low!", dismissible: true },
    { id: "4", type: "success", message: "Your new student ID has been delivered!", dismissible: true },
  ]);

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-xl p-4 flex justify-between items-center rounded-b-lg">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/home")}
          className="text-gray-800 hover:text-gray-900"
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        <Bell className="h-6 w-6 text-gray-700" />
      </header>

      {/* Notification List */}
      <main className="flex-1 p-6 space-y-6">
        {notifications.length > 0 ? (
          <div className="space-y-6">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-5 rounded-lg shadow-xl flex justify-between items-center border-l-4 transition-all duration-300",
                  NOTIFICATION_TYPES[notification.type]
                )}
              >
                <div>
                  <h2 className="text-lg font-medium">{notification.message}</h2>
                  <p className="text-sm text-gray-600">
                    {notification.type === "warning" && "Take action soon!"}
                    {notification.type === "info" && "Check it out now!"}
                    {notification.type === "success" && "Congratulations!"}
                  </p>
                </div>
                {notification.dismissible && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dismissNotification(notification.id)}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Dismiss</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <h2 className="text-xl font-medium">No Notifications</h2>
            <p className="text-sm">You're all caught up for now!</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-xl flex justify-around items-center py-4 border-t rounded-t-lg">
        {/* Home Icon */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/home")}
          className="text-gray-800 hover:text-gray-900 transition-transform transform hover:scale-110"
        >
          <Home className="h-10 w-10" />
          <span className="sr-only">Home</span>
        </Button>

        {/* Notification Bell */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/notifications")}
            className="text-gray-800 hover:text-gray-900 transition-transform transform hover:scale-110"
          >
            <Bell className="h-10 w-10" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce">
                {notifications.length}
              </span>
            )}
          </Button>

          {/* Dropdown on Hover */}
          <div className="absolute right-0 w-48 mt-2 bg-white border shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 border-b last:border-b-0",
                  NOTIFICATION_TYPES[notification.type]
                )}
              >
                <p>{notification.message}</p>
                {notification.dismissible && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dismissNotification(notification.id)}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Dismiss</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Profile Icon */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/profile")}
          className="text-gray-800 hover:text-gray-900 transition-transform transform hover:scale-110"
        >
          <User className="h-10 w-10" />
          <span className="sr-only">Profile</span>
        </Button>
      </nav>
    </div>
  );
};

export default NotificationPage;
