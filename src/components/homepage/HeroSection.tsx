import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroImage from "@/assets/hero.png";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section
      className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-green-50"
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
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: 0.6 }}
>
  {/* Hero image container with professional animations */}
  <div className="relative">
    {/* Main image with subtle entrance */}
    <motion.div
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 flex justify-center items-center"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      whileHover={{ 
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        y: -4
      }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      
      <motion.img
        src={HeroImage}
        alt="9jacart BNPL Platform - Empowering vendors and customers"
        className="relative w-[70%] h-auto rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      />
    </motion.div>

    {/* Subtle floating badges */}
    <motion.div
      className="absolute -top-3 -right-3 bg-primary text-white px-3 py-1.5 rounded-lg shadow-md text-xs font-semibold"
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        delay: 1.2
      }}
    >
      <span className="flex items-center gap-1">
        <motion.span
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          ↻
        </motion.span>
        Live Platform
      </span>
    </motion.div>

    <motion.div
      className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 text-primary px-3 py-1.5 rounded-lg shadow-md text-xs font-semibold border border-gray-200 dark:border-gray-700"
      initial={{ scale: 0, rotate: 10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        delay: 1.4
      }}
    >
      Trusted
    </motion.div>

    {/* Hover-triggered info dots */}
    <div className="absolute inset-0 pointer-events-none">
      {[
        { x: "20%", y: "30%", delay: 0.2 },
        { x: "70%", y: "60%", delay: 0.4 },
        { x: "40%", y: "80%", delay: 0.6 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/30 rounded-full"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [0, 1, 0],
          }}
          transition={{
            scale: {
              duration: 3,
              repeat: Infinity,
              delay: dot.delay,
              times: [0, 0.5, 1]
            }
          }}
          style={{
            left: dot.x,
            top: dot.y,
          }}
        />
      ))}
    </div>

    {/* Subtle border highlight on hover */}
    <motion.div
      className="absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none"
      whileHover={{
        borderColor: "rgba(59, 130, 246, 0.2)",
      }}
      transition={{ duration: 0.3 }}
    />

    {/* Minimal counter animation */}
    <div className="absolute bottom-4 right-4 pointer-events-none">
      <motion.div
        className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-2 py-1 rounded"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8 }}
      >
        <span className="font-medium">Active:</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="font-bold text-primary"
        >
          15,234
        </motion.span>
      </motion.div>
    </div>
  </div>
</motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
