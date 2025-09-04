import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { registerImg } from "../../assets/auth";
import { Image } from "../ui/Image";
import Logo from "@/assets/logo2.png";

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex p-12 bg-white">
      {/* Left side - Image/Branding */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          {/* Back to home link */}
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Store
          </Link>
          {/* Logo */}
          <div className="flex mb-6">
            <img src={Logo} alt="9jacart Logo" className="h-10 w-auto" />
          </div>
          <Outlet />
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Background Image */}
        <Image
          src={registerImg}
          alt="E-commerce shopping experience"
          className="absolute inset-0 w-full h-full"
          objectFit="cover"
          lazy={false}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-20" />
      </div>
    </div>
  );
};

export default AuthLayout;
