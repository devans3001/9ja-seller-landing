import React from "react";
import Logo from "@/assets/logo2.png";

interface BusinessVerificationLayoutProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  children: React.ReactNode;
}

const BusinessVerificationLayout: React.FC<BusinessVerificationLayoutProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
  children
}) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#E8EAEB] rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={Logo} alt="9ja-cart Logo" className="h-8 w-auto" />
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          {Array.from({ length: totalSteps }, (_, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index + 1 <= currentStep
                      ? 'bg-primary text-white'
                      : 'bg-white text-primary'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-xs text-gray-600 mt-1 text-center">
                  {stepLabels[index]}
                </span>
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`w-12 h-0.5 mx-2 ${
                    index + 1 < currentStep ? 'bg-green-700' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Business Verification
        </h1>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default BusinessVerificationLayout;