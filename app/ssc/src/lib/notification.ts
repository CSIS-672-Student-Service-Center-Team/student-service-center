export interface Notification {
  id: string;
  type: "warning" | "info" | "success";
  message: string;
  dismissible?: boolean;
  link?: string;
  isRead: boolean;
}