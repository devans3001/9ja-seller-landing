import AboutSection from "@/components/homepage/AboutSection";
import BenefitsSection from "@/components/homepage/BenefitsSection";
import CTASection from "@/components/homepage/CTASection";
import Experience from "@/components/homepage/Experience";
import FAQs from "@/components/homepage/FAQs";
import FinalCTASection from "@/components/homepage/FinalCTASection";
import Footer from "@/components/homepage/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import Incentive from "@/components/homepage/Incentive";
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
      <Experience/>
      <BenefitsSection/>
      <ProductGallerySection/>
      <Incentive/>
      <TrailerSection/>
      <CTASection/>
      <FAQs/>

      {/* Footer */}
      <FinalCTASection/>
      <Footer/>
      {/* <footer className="border-t border-border mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 SellerHub. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
