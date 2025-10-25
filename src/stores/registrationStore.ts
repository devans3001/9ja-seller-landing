import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Simplified registration store - mainly for success page state
interface RegistrationStore {
  isRegistrationComplete: boolean;
  setRegistrationComplete: (complete: boolean) => void;
  reset: () => void;
}

export const useRegistrationStore = create<RegistrationStore>()(
  devtools(
    (set) => ({
      isRegistrationComplete: false,
      
      setRegistrationComplete: (complete: boolean) => {
        set({ isRegistrationComplete: complete });
      },

      reset: () => {
        set({ isRegistrationComplete: false });
      },
    }),
    {
      name: 'registration-store',
    }
  )
);