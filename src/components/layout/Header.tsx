import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, message: 'New order received', time: '2 min ago', unread: true },
    { id: 2, message: 'Product inventory low', time: '1 hour ago', unread: true },
    { id: 3, message: 'Payment processed', time: '3 hours ago', unread: false },
  ];

  return (
    <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-semibold text-foreground">Seller Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 px-3 py-2 text-sm border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors relative"
          >
            <span className="text-xl">🔔</span>
            {notifications.some(n => n.unread) && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-md shadow-lg z-50">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-border last:border-b-0 ${
                      notification.unread ? 'bg-primary/5' : ''
                    }`}
                  >
                    <p className="text-sm text-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-border">
                <Link
                  to="/notifications"
                  className="block w-full text-center py-2 text-sm text-primary hover:text-primary/80"
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary transition-colors"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">JS</span>
            </div>
            <span className="hidden md:block text-sm font-medium text-foreground">John Seller</span>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-50">
              <div className="p-2">
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-md"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-md"
                >
                  Settings
                </Link>
                <Link
                  to="/help"
                  className="block px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-md"
                >
                  Help & Support
                </Link>
                <hr className="my-2 border-border" />
                <Link
                  to="/login"
                  className="block px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-md"
                >
                  Sign out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}