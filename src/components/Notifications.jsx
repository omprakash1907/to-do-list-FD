import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  getNotifications, 
  markAllNotificationsAsRead, 
  markNotificationAsRead 
} from "../redux/feature/notificationSlice";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Bell, CheckCircle, MailCheck } from "lucide-react";

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error, unreadCount } = useSelector(
    (state) => state.notifications
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(getNotifications(token));
    }
  }, [dispatch, token]);

  const handleMarkAsRead = async (id) => {
    try {
      await dispatch(markNotificationAsRead({ id, token })).unwrap();
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await dispatch(markAllNotificationsAsRead(token)).unwrap();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  return (
    <div className="relative">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <div className="indicator">
            <Bell className="h-6 w-6" />
            {unreadCount > 0 && (
              <Badge className="badge-sm indicator-item bg-red-500 text-white">
                {unreadCount}
              </Badge>
            )}
          </div>
        </label>
        <div
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box  mt-2"
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Notifications</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0 || loading}
              >
                <MailCheck className="mr-2 h-4 w-4" />
                Mark all as read
              </Button>
            </div>

            {loading && <div className="text-center py-4">Loading...</div>}
            {error && (
              <div className="alert alert-error text-sm">{error}</div>
            )}

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {notifications.length === 0 && !loading && (
                <div className="text-center py-4 text-gray-500">
                  No notifications yet
                </div>
              )}

              {notifications.map((notif) => (
                <div
                  key={notif._id}
                  className={`p-3 rounded-lg ${
                    notif.isRead ? "bg-gray-50" : "bg-blue-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{notif.message}</p>
                      {notif.task && (
                        <p className="text-sm text-gray-600">
                          Task: {notif.task.title}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notif.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {!notif.isRead && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead(notif._id)}
                        disabled={loading}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;