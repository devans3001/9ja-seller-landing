export * from './api.types';
export * from './auth.types';
export * from './product.types';
export * from './category.types';
export * from './business-category.types';
export * from './registration.types';
export * from './dashboard.types';


// Business and form data types
export const BusinessType = {
  SOLE_PROPRIETOR: "sole_proprietor",
  LIMITED: "limited",
  UNREGISTERED: "unregistered",
  PARTNERSHIP: "partnership",
} as const;

export type BusinessType = (typeof BusinessType)[keyof typeof BusinessType];

export const ProductCategory = {
  FASHION: "fashion",
  ELECTRONICS: "electronics",
  GROCERIES: "groceries",
  HEALTH_BEAUTY: "health_beauty",
  HOME_APPLIANCES: "home_appliances",
  SERVICES: "services",
  OTHER: "other",
} as const;

export type ProductCategory =
  (typeof ProductCategory)[keyof typeof ProductCategory];

export interface VendorFormData {
  businessDetails: {
    businessName: string;
    businessType: BusinessType;
    countryState: string;
  };
  contactPerson: {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
  };
  productDetails: {
    categories: ProductCategory[];
    specialHandling: boolean;
    productOrigin: "local" | "imported" | "both";
  };
  experience?: {
    sellsOnline: boolean;
    platforms?: string;
  };
  notifications: {
    wantsNotifications: boolean | null; // null means no choice made yet
    message?: string;
  };
}

// Content data models
export interface VendorBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  id: string;
  category: "general" | "payments" | "delivery" | "vendor" | "support";
  question: string;
  answer: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  socialMedia: {
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
  };
}

// API Interface for waitlist submission
export interface Waitlist {
  businessName: string;
  businessType: string;
  stateOfOperation: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  productCategories: string[];
  specialHandling: boolean;
  productOrigin: string;
  onlinePresence: boolean;
  onlinePlatforms: string;
  receiveNotification: boolean;
  message: string;
}

// Form validation and state types
export interface FormErrors {
  [fieldName: string]: string | undefined;
}

export interface SubmissionState {
  status: "idle" | "submitting" | "success" | "error" | "already-registered";
  message?: string;
}

// Contact form types
export interface ContactFormData {
  fullName: string;
  emailAddress: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  fullName?: string;
  emailAddress?: string;
  subject?: string;
  message?: string;
}

export interface ContactSubmissionState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
}
