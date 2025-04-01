// src/components/NotificationBell.js
import React from "react";
import { useSelector } from "react-redux";
import { Bell } from "lucide-react";
import { Badge } from "./ui/badge";

const NotificationBell = () => {
  const { unreadCount } = useSelector((state) => state.notifications);

  return (
    <div className="relative">
      <Bell className="h-6 w-6" />
      {unreadCount > 0 && (
        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
          {unreadCount}
        </Badge>
      )}
    </div>
  );
};

export default NotificationBell;