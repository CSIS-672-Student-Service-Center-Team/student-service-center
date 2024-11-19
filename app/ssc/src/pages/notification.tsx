import React, { useState } from "react";
import { ArrowLeft, Bell, Home, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NavBar from "@/components/ui/navBar";
import Header from "@/components/ui/pageHeader";
import { Notification } from "@/components/notifications/notification"

export default function Component() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "warning",
      message: "You have received a parking ticket!",
      dismissible: false,
    },
    {
      id: "2",
      type: "info",
      message: "New meal plans are available!",
      dismissible: true,
    },
    {
      id: "3",
      type: "warning",
      message: "Your card balance is low!",
      dismissible: true,
    },
    {
      id: "4",
      type: "success",
      message: "Your new student ID has been delivered!",
      dismissible: true,
    },
  ]);

  const dismissNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header title="Notifications" isHomeScreen={false} />

      {/* Notifications List */}
      <main className="flex-1 p-4 space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
              "p-4 rounded-lg flex justify-between items-start",
              notification.type === "warning" && "bg-red-100 text-red-900",
              notification.type === "info" && "bg-gray-100 text-gray-900",
              notification.type === "success" && "bg-green-100 text-green-900"
            )}
          >
            <span className="text-sm font-medium">{notification.message}</span>
            {notification.dismissible && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-5 w-5 hover:bg-transparent",
                  notification.type === "warning" &&
                    "text-red-900 hover:text-red-800",
                  notification.type === "info" &&
                    "text-gray-900 hover:text-gray-800",
                  notification.type === "success" &&
                    "text-green-900 hover:text-green-800"
                )}
                onClick={() => dismissNotification(notification.id)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Dismiss</span>
              </Button>
            )}
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No notifications at this time.
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <NavBar />
    </div>
  );
}
