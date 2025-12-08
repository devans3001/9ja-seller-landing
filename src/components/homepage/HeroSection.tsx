import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroImage from "@/assets/hero.png";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section
      className="relative py-20 lg:py-25 overflow-hidden bg-gradient-to-b from-white to-green-50"
      aria-labelledby="hero-heading"
    >
      {/* Simple background elements */}
      <div className="absolute inset-0">
        {/* Main background circle */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

        {/* Accent circle */}
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-green-200/20 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <motion.h1
              id="hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Transform your business{" "}
              <span className="text-primary relative">
                Sell more,
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/30 rounded-full" />
              </span>{" "}
              Less stress
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Give your customers the freedom to Buy Now, Pay Later. Boost your
              sales, attract more shoppers, and grow with ease.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                asChild
                size="lg"
                className="text-lg bg-[#8DEB6E] text-primary font-bold px-8 py-6 shadow-lg hover:shadow-xl hover:bg-[#8DEB6E]/80 transition-all duration-300"
              >
                <Link
                  to="/vendor-form"
                  className="inline-flex items-center gap-2"
                >
                  Join Our Vendor Network
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              className="relative w-full max-w-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Hero image container with enhanced styling */}
              <div className="relative">
                <motion.img
                  src={HeroImage}
                  alt="9jacart BNPL Platform - Empowering vendors and customers"
                  className="w-[70%] h-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />

                {/* Decorative elements around the image */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-12 h-12 bg-accent/20 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                />

                {/* Subtle glow effect */}
                {/* <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" /> */}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
