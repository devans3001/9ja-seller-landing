import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import BusinessVerificationLayout from '../../../components/layout/BusinessVerificationLayout';
import BusinessVerificationDetails from './BusinessVerificationDetails';
import BusinessVerificationDocuments from './BusinessVerificationDocuments';

export default function BusinessVerificationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationData, setVerificationData] = useState<Record<string, any>>({});
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current step based on route
  const getCurrentStep = () => {
    if (location.pathname.includes('documents')) return 2;
    return 1;
  };

  const stepLabels = ['Business Details', 'Document Upload'];

  const handleStepData = (stepData: Record<string, any>) => {
    setVerificationData((prev: Record<string, any>) => ({ ...prev, ...stepData }));
    
    if (currentStep === 1) {
      setCurrentStep(2);
      navigate('/register/business-verification/documents');
    } else {
      // Final submission
      console.log('Complete verification data:', { ...verificationData, ...stepData });
      navigate('/register/success');
    }
  };

  return (
    <BusinessVerificationLayout
      currentStep={getCurrentStep()}
      totalSteps={2}
      stepLabels={stepLabels}
    >
      <Routes>
        <Route 
          path="/" 
          element={<BusinessVerificationDetails onNext={handleStepData} />} 
        />
        <Route 
          path="/documents" 
          element={<BusinessVerificationDocuments onNext={handleStepData} />} 
        />
      </Routes>
    </BusinessVerificationLayout>
  );
}