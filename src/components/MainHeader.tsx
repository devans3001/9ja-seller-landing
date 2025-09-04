import { Link } from "react-router-dom";
import Logo from "@/assets/logo.png";

export default function MainHeader() {
  return (
    <header className=" bg-[#182F38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="SellerHub Logo" className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-white  transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-[#8DEB6E] text-primary rounded-md hover:bg-[#8DEB6E]/90 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
