import { Link, useLocation } from "react-router-dom";
import Logo from "@/assets/logo.png";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "📊" },
  { name: "Products", href: "/products", icon: "📦" },
  { name: "Orders", href: "/orders", icon: "🛒" },
  { name: "Storefront", href: "/storefront", icon: "🏪" },
  { name: "Analytics", href: "/analytics", icon: "📈" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col w-64 bg-[#182F38] border-r border-[#8DEB6E]">
      <div className="flex items-center h-16 px-6 border-b border-[#8DEB6E]">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <img src={Logo} alt="SellerHub Logo" className="h-8 w-auto" />
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive =
            location.pathname === item.href ||
            (item.href !== "/dashboard" &&
              location.pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? "bg-[#8DEB6E] text-primary"
                  : "text-white hover:bg-[#8DEB6E]/10"
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#8DEB6E] rounded-full flex items-center justify-center">
            <span className="text-primary text-sm font-medium">
              JS
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              John Seller
            </p>
            <p className="text-xs text-white/50 truncate">
              john@example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
