import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/constants';
import type { BusinessCategory, BusinessCategoriesApiResponse } from '@/types/business-category.types';

export class BusinessCategoriesService {
  async getBusinessCategories(): Promise<BusinessCategory[]> {
    try {
      const response = await apiClient.get<BusinessCategoriesApiResponse>(
        API_ENDPOINTS.BUSINESS.CATEGORIES,
        {
          requiresAuth: false, // Uses Basic Auth from config
        }
      );

      if (response.error) {
        throw new Error(response.message || 'Failed to fetch business categories');
      }

      console.log('🏷️ Business Categories API Response:', {
        status: response.status,
        error: response.error,
        message: response.message,
        dataCount: response.data?.data?.length || 0,
        sampleCategory: response.data?.data?.[0]
      });

      return response.data?.data || [];
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch business categories';
      throw new Error(errorMessage);
    }
  }
}

// Export singleton instance
export const businessCategoriesService = new BusinessCategoriesService();