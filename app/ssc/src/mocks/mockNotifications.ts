import { Notification } from "@/lib/notification"

export const mockNotifications: Notification[] = [
    {
      id: "1",
      type: "warning",
      message: "You have received a parking ticket!",
      dismissible: false,
      link: "/parking/tickets",
      isRead: false,
    },
    {
      id: "2",
      type: "info",
      message: "New meal plans are available!",
      dismissible: true,
      link: "/dining/meal-plan",
      isRead: false,
    },
    {
      id: "3",
      type: "warning",
      message: "Your card balance is low!",
      dismissible: true,
      link: "/balance",
      isRead: true,
    },
    {
      id: "4",
      type: "success",
      message: "Your new student ID has been delivered!",
      dismissible: true,
      isRead: true,
    },
  ];