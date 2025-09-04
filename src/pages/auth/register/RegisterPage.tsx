import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterEmailPassword from './RegisterEmailPassword';
import RegisterBasicInfo from './RegisterBasicInfo';

interface RegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  businessName: string;
  businessCategory: string;
  phone: string;
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<Partial<RegistrationData>>({});
  const [isSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleStepData = (stepData: any) => {
    setRegistrationData(prev => ({ ...prev, ...stepData }));
    
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // After basic info, navigate to business verification
      const completeData = { ...registrationData, ...stepData };
      console.log('Registration data before verification:', completeData);
      navigate('/register/business-verification');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <RegisterEmailPassword
            onNext={handleStepData}
            initialData={{
              email: registrationData.email || '',
              password: registrationData.password || '',
              confirmPassword: registrationData.confirmPassword || ''
            }}
          />
        );
      case 2:
        return (
          <RegisterBasicInfo
            onNext={handleStepData}
            onBack={handleBack}
            initialData={{
              fullName: registrationData.fullName || '',
              businessName: registrationData.businessName || '',
              businessCategory: registrationData.businessCategory || '',
              phone: registrationData.phone || ''
            }}
          />
        );
      default:
        return null;
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <h2 className="text-xl font-semibold text-foreground">Submitting your application...</h2>
          <p className="text-muted-foreground">Please wait while we process your information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {renderStep()}
    </div>
  );
}