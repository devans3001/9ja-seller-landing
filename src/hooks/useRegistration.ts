import { useRegistrationStore } from '@/stores/registrationStore';

// Simplified registration hook for success page
export const useRegistration = () => {
  const store = useRegistrationStore();
  
  return {
    isRegistrationComplete: store.isRegistrationComplete,
    setRegistrationComplete: store.setRegistrationComplete,
    reset: store.reset,
  };
};