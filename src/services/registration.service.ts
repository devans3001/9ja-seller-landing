import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/constants";
import type {
  CompleteRegistrationData,
  RegistrationApiResponse,
  RegistrationApiError,
  RegistrationFieldErrors,
} from "@/types";

export class RegistrationError extends Error {
  public fieldErrors: RegistrationFieldErrors;
  public status: number;

  constructor(message: string, fieldErrors: RegistrationFieldErrors = {}, status: number = 400) {
    super(message);
    this.name = 'RegistrationError';
    this.fieldErrors = fieldErrors;
    this.status = status;
  }
}

export class RegistrationService {
  /**
   * Complete registration with all data in single request
   * Maintains existing API configuration and FormData structure
   */
  async submitCompleteRegistration(
    data: CompleteRegistrationData
  ): Promise<RegistrationApiResponse> {
    try {
      // Create FormData with all registration information
      const formData = new FormData();

      // Files will be uploaded with their original names

      // Format phone number to match your example (without + prefix)
      const formatPhoneForAPI = (phone: string): string => {
        const cleaned = phone.replace(/\s/g, "");
        // Remove +234 prefix if present and return just the number part
        if (cleaned.startsWith("+234")) {
          return "234" + cleaned.substring(4);
        }
        if (cleaned.startsWith("234")) {
          return cleaned;
        }
        if (cleaned.startsWith("0")) {
          return "234" + cleaned.substring(1);
        }
        return "234" + cleaned;
      };

      // Basic account info (matching your Postman order)
      formData.append("emailAddress", data.emailAddress);
      formData.append("password", data.password);
      formData.append("fullName", data.fullName);
      formData.append("businessName", data.businessName);
      // Ensure businessCategory is a valid number and convert to string
      const businessCategoryValue = Number.isInteger(data.businessCategory) && data.businessCategory > 0 
        ? data.businessCategory.toString() 
        : "1"; // Default fallback
      
      console.log('🏷️ Business Category Conversion:', {
        originalValue: data.businessCategory,
        originalType: typeof data.businessCategory,
        isInteger: Number.isInteger(data.businessCategory),
        isPositive: data.businessCategory > 0,
        finalValue: businessCategoryValue
      });
      
      // LOG ALL FORMDATA BEING SENT
      console.log("📤 COMPLETE FORMDATA BEING SENT TO BACKEND:");
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}: [FILE] ${value.name} (${value.size} bytes)`);
        } else {
          console.log(`  ${key}: "${value}" (type: ${typeof value})`);
        }
      }
      
      formData.append("businessCategory", businessCategoryValue);
      formData.append("phoneNumber", formatPhoneForAPI(data.phoneNumber));
      formData.append("businessRegNumber", data.businessRegNumber || "");
      formData.append("storeName", data.storeName);
      formData.append("businessAddress", data.businessAddress);
      // Ensure taxIdNumber is always sent (API requires it)
      formData.append("taxIdNumber", data.taxIdNumber || "");

      // Documents without custom filenames - use original file names
      formData.append("idDocument", data.idDocument);
      formData.append("businessRegCertificate", data.businessRegCertificate);

      // Make the API request

      const response = await apiClient.post<RegistrationApiResponse>(
        API_ENDPOINTS.REGISTRATION.SIGNUP,
        formData,
        {
          requiresAuth: false,
          isFormData: true,
        }
      );

      if (response.error) {
        throw new Error(response.message || "Registration failed");
      }

      return response;
    } catch (error) {
      // LOG RAW BACKEND ERROR RESPONSE FOR DEBUGGING
      console.log("🚨 RAW BACKEND ERROR - Full Error Object:", error);
      
      // Handle API validation errors
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { status?: number; data?: RegistrationApiError };
        };

        // LOG THE COMPLETE RAW RESPONSE
        console.log("🚨 RAW BACKEND ERROR - Response Status:", axiosError.response?.status);
        console.log("🚨 RAW BACKEND ERROR - Complete Response Data:", axiosError.response?.data);
        console.log("🚨 RAW BACKEND ERROR - Response Headers:", (axiosError.response as { headers?: unknown })?.headers);
      }

      // ALSO CHECK IF ERROR HAS PRESERVED RESPONSE FROM API CLIENT
      if (error && typeof error === "object" && "response" in error && (error as { response?: unknown }).response) {
        const preservedResponse = (error as { response?: unknown }).response as { status?: number; data?: RegistrationApiError };
        console.log("🚨 RAW BACKEND ERROR - Preserved Response from API Client:", preservedResponse);
        console.log("🚨 RAW BACKEND ERROR - Preserved Response Data:", preservedResponse?.data);
        
        if (preservedResponse?.data) {
          console.log("🚨 RAW BACKEND ERROR - Preserved JSON Response:");
          console.log(JSON.stringify(preservedResponse.data, null, 2));
          
          // Handle the preserved response
          if (preservedResponse.data?.messages) {
            const apiError = preservedResponse.data;
            
            // LOG EACH INDIVIDUAL ERROR MESSAGE
            console.log("🚨 RAW BACKEND ERROR - Individual Messages from Preserved Response:");
            Object.entries(apiError.messages).forEach(([field, message]) => {
              console.log(`  ${field}: "${message}"`);
            });
            
            const fieldErrors: RegistrationFieldErrors = {};
            
            // Map API field names to our form field names
            Object.entries(apiError.messages).forEach(([field, message]) => {
              fieldErrors[field as keyof RegistrationFieldErrors] = message as string;
            });

            throw new RegistrationError(
              "Please fix the following errors:",
              fieldErrors,
              preservedResponse.status || 400
            );
          }
        }
      }

      // Handle original axios errors
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { status?: number; data?: RegistrationApiError };
        };
        
        // LOG THE EXACT JSON STRUCTURE
        if (axiosError.response?.data) {
          console.log("🚨 RAW BACKEND ERROR - JSON Response:");
          console.log(JSON.stringify(axiosError.response.data, null, 2));
        }

        if (axiosError.response?.data?.messages) {
          const apiError = axiosError.response.data;
          
          // LOG EACH INDIVIDUAL ERROR MESSAGE
          console.log("🚨 RAW BACKEND ERROR - Individual Messages:");
          Object.entries(apiError.messages).forEach(([field, message]) => {
            console.log(`  ${field}: "${message}"`);
          });
          
          const fieldErrors: RegistrationFieldErrors = {};
          
          // Map API field names to our form field names
          Object.entries(apiError.messages).forEach(([field, message]) => {
            fieldErrors[field as keyof RegistrationFieldErrors] = message;
          });

          throw new RegistrationError(
            "Please fix the following errors:",
            fieldErrors,
            axiosError.response.status || 400
          );
        }
      }

      // Handle other errors
      const errorMessage = error instanceof Error ? error.message : "Registration failed";
      console.log("🚨 RAW BACKEND ERROR - Non-API Error:", errorMessage);
      throw new RegistrationError(errorMessage);
    }
  }

  /**
   * Validate complete registration data
   */
  validateCompleteRegistration(
    data: Partial<CompleteRegistrationData>
  ): Record<string, string> {
    const errors: Record<string, string> = {};

    // Email validation
    if (!data.emailAddress?.trim()) {
      errors.emailAddress = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.emailAddress)) {
      errors.emailAddress = "Please enter a valid email address";
    }

    // Password validation
    if (!data.password?.trim()) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    // Personal info validation
    if (!data.fullName?.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!data.businessName?.trim()) {
      errors.businessName = "Business name is required";
    }

    if (!data.businessCategory) {
      errors.businessCategory = "Please select a business category";
    }

    // Phone validation
    if (!data.phoneNumber?.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else {
      const phoneRegex = /^(\+234|234|0)?[789][01]\d{8}$/;
      if (!phoneRegex.test(data.phoneNumber.replace(/\s/g, ""))) {
        errors.phoneNumber = "Please enter a valid Nigerian phone number";
      }
    }

    // Business details validation
    if (!data.storeName?.trim()) {
      errors.storeName = "Store name is required";
    }

    if (!data.businessAddress?.trim()) {
      errors.businessAddress = "Business address is required";
    }

    // Document validation
    if (!data.idDocument) {
      errors.idDocument = "ID document is required";
    }

    if (!data.businessRegCertificate) {
      errors.businessRegCertificate =
        "Business registration certificate is required";
    }

    return errors;
  }
}

// Export singleton instance
export const registrationService = new RegistrationService();
