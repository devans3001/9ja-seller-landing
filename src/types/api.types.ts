import type { ContactFormData, VendorFormData, Waitlist } from ".";

export interface ApiResponse<T = any> {
  status: number;
  error: boolean;
  message: string;
  data?: T;
}

export interface ProductsApiResponseWrapper {
  status: number;
  error: boolean;
  message: string;
  data: unknown[];
  pagination: {
    currentPage: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface ApiError {
  status: number;
  error: number;
  messages: {
    error: string;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}


// API Configuration with Environment-based Protocol Detection
// Automatically uses HTTP for local development and HTTPS for production
const getApiConfig = () => {
  // Get environment variables with fallbacks
  const protocol =
    import.meta.env.VITE_API_PROTOCOL ||
    (import.meta.env.DEV ? "http" : "https");
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "api.9jacart.ng";
  const version = import.meta.env.VITE_API_VERSION || "v1";

  return {
    protocol,
    baseUrl,
    version,
    fullUrl: `${protocol}://${baseUrl}/${version}`,
  };
};

const API_CONFIG = getApiConfig();
const API_BASE_URL = API_CONFIG.fullUrl;
const WAITLIST_ENDPOINT = `${API_BASE_URL}/vendor/waitlist`;
const CONTACT_ENDPOINT = `${API_BASE_URL}/vendor/contact`;

// Log API configuration in development
if (import.meta.env.DEV) {
  console.log("API Configuration:", {
    environment: import.meta.env.MODE,
    protocol: API_CONFIG.protocol,
    baseUrl: API_CONFIG.baseUrl,
    fullUrl: API_BASE_URL,
  });
}

// Test API endpoint connectivity
export const testApiConnection = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const response = await fetch(WAITLIST_ENDPOINT, {
      method: "OPTIONS", // Use OPTIONS to test connectivity without sending data
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      message: `API endpoint is reachable (Status: ${response.status})`,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown connection error",
    };
  }
};

// Map form data to API format
export const mapFormDataToWaitlist = (formData: VendorFormData): Waitlist => {
  // Map business types to API format
  const businessTypeMap: Record<string, string> = {
    sole_proprietor: "Sole Proprietorship",
    limited: "Limited Company",
    unregistered: "Unregistered Business",
    partnership: "Partnership",
  };

  // Map product categories to API format
  const categoryMap: Record<string, string> = {
    fashion: "Fashion & Clothing",
    electronics: "Electronics & Gadgets",
    groceries: "Groceries & Food Items",
    health_beauty: "Health & Beauty",
    home_appliances: "Home & Appliances",
    services: "Services",
    other: "Other",
  };

  // Map product origin to API format
  const originMap: Record<string, string> = {
    local: "Local Products Only",
    imported: "Imported Products Only",
    both: "Both Local and Imported",
  };

  return {
    businessName: formData.businessDetails.businessName || "",
    businessType:
      businessTypeMap[formData.businessDetails.businessType] ||
      formData.businessDetails.businessType,
    stateOfOperation: formData.businessDetails.countryState,
    fullName: formData.contactPerson.fullName,
    phoneNumber: formData.contactPerson.phoneNumber,
    emailAddress: formData.contactPerson.emailAddress,
    productCategories: formData.productDetails.categories.map(
      (cat) => categoryMap[cat] || cat
    ),
    specialHandling: formData.productDetails.specialHandling,
    productOrigin:
      originMap[formData.productDetails.productOrigin] ||
      formData.productDetails.productOrigin,
    onlinePresence: formData.experience?.sellsOnline || false,
    onlinePlatforms: formData.experience?.platforms || "None",
    receiveNotification: formData.notifications.wantsNotifications ?? true,
    message: formData.notifications.message || "",
  };
};

// Submit waitlist data to API
export const submitWaitlist = async (
  formData: VendorFormData
): Promise<{
  success: boolean;
  message?: string;
  fieldErrors?: { [key: string]: string };
  errorType?: "validation" | "duplicate_email" | "server" | "network";
}> => {
  try {
    const waitlistData = mapFormDataToWaitlist(formData);

    const response = await fetch(WAITLIST_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(waitlistData),
    });

    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = "Failed to submit application";
      const fieldErrors: { [key: string]: string } = {};
      let errorType: "validation" | "duplicate_email" | "server" | "network" =
        "server";

      try {
        const errorData = await response.json();

        // Handle API-specific error format
        if (errorData.messages && typeof errorData.messages === "object") {
          // Check for duplicate email error specifically
          const emailError = errorData.messages.emailAddress;
          const isDuplicateEmail =
            emailError &&
            (emailError.includes("unique value") ||
              emailError.includes("already exists") ||
              emailError.includes("duplicate") ||
              emailError.toLowerCase().includes("unique"));

          if (isDuplicateEmail) {
            errorType = "duplicate_email";
            fieldErrors.emailAddress =
              "This email is already registered on our waitlist. Please use a different email address or contact support if this is an error.";
            errorMessage = "Email address already registered";
          } else {
            // Handle other validation errors
            errorType = "validation";
            Object.entries(errorData.messages).forEach(([field, message]) => {
              fieldErrors[field] = String(message);
            });
            errorMessage = "Please fix the validation errors and try again";
          }
        } else {
          errorMessage = errorData.message || errorData.error || errorMessage;
        }
      } catch {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }

      return {
        success: false,
        message: errorMessage,
        fieldErrors,
        errorType,
      };
    }

    const result = await response.json();
    return {
      success: true,
      message:
        result.message ||
        "Thank you! Your vendor application has been submitted successfully. We'll notify you when registration opens.",
    };
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message.includes("Failed to fetch")
    ) {
      // This covers SSL certificate errors, CORS issues, and network failures
      return {
        success: false,
        message:
          "Unable to connect to the server. This might be due to a network issue or server configuration. Please try again later or contact support if the problem persists.",
        errorType: "network" as const,
      };
    }

    if (error instanceof Error) {
      // SSL Certificate errors
      if (
        error.message.includes("ERR_CERT") ||
        error.message.includes("certificate")
      ) {
        return {
          success: false,
          message:
            "Server security certificate issue. Please contact support or try again later.",
          errorType: "network" as const,
        };
      }

      // Network or fetch errors
      if (
        error.message.includes("NetworkError") ||
        error.message.includes("network")
      ) {
        return {
          success: false,
          message:
            "Network error: Please check your internet connection and try again.",
          errorType: "network" as const,
        };
      }

      // API errors
      if (error.message.includes("400")) {
        return {
          success: false,
          message:
            "Invalid data: Please check your form entries and try again.",
          errorType: "validation" as const,
        };
      }

      if (error.message.includes("500")) {
        return {
          success: false,
          message: "Server error: Please try again later or contact support.",
          errorType: "server" as const,
        };
      }

      return {
        success: false,
        message: `Connection error: ${error.message}`,
        errorType: "network" as const,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
      errorType: "server" as const,
    };
  }
};

// Contact API Functions
// Submit contact form data to API
export const submitContact = async (
  formData: ContactFormData
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = "Failed to submit contact form";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }

      throw new Error(`${response.status}: ${errorMessage}`);
    }

    const result = await response.json();
    return {
      success: true,
      message:
        result.message ||
        "Thank you for your message! We'll get back to you soon.",
    };
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message.includes("Failed to fetch")
    ) {
      // This covers SSL certificate errors, CORS issues, and network failures
      return {
        success: false,
        message:
          "Unable to connect to the server. This might be due to a network issue or server configuration. Please try again later or contact support if the problem persists.",
      };
    }

    if (error instanceof Error) {
      // SSL Certificate errors
      if (
        error.message.includes("ERR_CERT") ||
        error.message.includes("certificate")
      ) {
        return {
          success: false,
          message:
            "Server security certificate issue. Please contact support or try again later.",
        };
      }

      // Network or fetch errors
      if (
        error.message.includes("NetworkError") ||
        error.message.includes("network")
      ) {
        return {
          success: false,
          message:
            "Network error: Please check your internet connection and try again.",
        };
      }

      // API errors
      if (error.message.includes("400")) {
        return {
          success: false,
          message:
            "Invalid data: Please check your form entries and try again.",
        };
      }

      if (error.message.includes("429")) {
        return {
          success: false,
          message:
            "Too many requests. Please wait a moment before trying again.",
        };
      }

      if (error.message.includes("500")) {
        return {
          success: false,
          message: "Server error: Please try again later or contact support.",
        };
      }

      return {
        success: false,
        message: `Connection error: ${error.message}`,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};

// Test contact API endpoint connectivity
export const testContactConnection = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: "OPTIONS", // Use OPTIONS to test connectivity without sending data
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      message: `Contact API endpoint is reachable (Status: ${response.status})`,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown connection error",
    };
  }
};
