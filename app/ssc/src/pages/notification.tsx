import React, { useState, useEffect } from "react";
import { Bell, AlertTriangle, Info, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import NavBar from "@/components/ui/navBar";
import Header from "@/components/ui/pageHeader";
import { useRouter } from "next/navigation";
import { useNotification } from "@/context/NotificationContext";
import { Notification } from "@/lib/notification";
import { mockNotifications } from "@/mocks/mockNotifications"

export default function Component() {
  const router = useRouter();
  const { unreadCount, setUnreadCount } = useNotification();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  useEffect(() => {
    const newUnreadCount = notifications.filter((n) => !n.isRead).length;
    setUnreadCount(newUnreadCount);
  }, [notifications, setUnreadCount]);

  const dismissNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notification.id ? { ...n, isRead: true } : n
      )
    );
    if (notification.link) {
      router.push(notification.link);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header title="Notifications" isHomeScreen={false} />

      <main className="flex-1 p-4 pt-20 pb-16">
        <Card className="w-full bg-white shadow-md">
          <CardContent className="p-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 rounded-lg flex justify-between items-center transition-colors mb-4",
                  notification.type === "warning" && "bg-red-50 text-red-800",
                  notification.type === "info" && "bg-blue-50 text-blue-800",
                  notification.type === "success" &&
                    "bg-green-50 text-green-800",
                  !notification.isRead && "border-l-4 border-red-800",
                  notification.link && "cursor-pointer"
                )}
                onClick={() =>
                  notification.link && handleNotificationClick(notification)
                }
              >
                <div className="flex items-center space-x-3">
                  {getIcon(notification.type)}
                  <span className="text-sm font-medium">
                    {notification.message}
                  </span>
                </div>
                {notification.dismissible && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      dismissNotification(notification.id);
                    }}
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
          </CardContent>
        </Card>
      </main>

      <NavBar />
    </div>
  );
}
