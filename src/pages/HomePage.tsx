import AboutSection from "@/components/homepage/AboutSection";
import BenefitsSection from "@/components/homepage/BenefitsSection";
import FAQs from "@/components/homepage/FAQs";
import HeroSection from "@/components/homepage/HeroSection";
import HowItWorks from "@/components/homepage/HowItWorks";
import ProductGallerySection from "@/components/homepage/ProductGallerySection";
import TrailerSection from "@/components/homepage/TrailerSection";
import MainHeader from "@/components/MainHeader";
// import { Link } from "react-router-dom";
// import DashboardOverviewImg from "@/assets/dashboard.png";
// import incentives from "@/assets/incentives.png";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <MainHeader />

      <HeroSection />
      <AboutSection />
      <HowItWorks />
      <TrailerSection/>
      <BenefitsSection/>
      <ProductGallerySection/>
      <FAQs/>

      {/* Footer */}
      <footer className="border-t border-border mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 SellerHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
