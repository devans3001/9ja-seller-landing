import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/constants';
import { createProductPayload, createEditProductPayload, validateProductData } from '@/lib/productData.utils';
import { createImageFormData, validateProductImages } from '@/lib/imageUpload.utils';
import type { 
  Product, 
  ProductsResponse, 
  ProductsQuery, 
  CreateProductRequest, 
  UpdateProductRequest,
  UploadProductImagesRequest
} from '@/types';
import type { ProductsApiResponseWrapper } from '@/types/api.types';

export class ProductsService {
  async getProducts(query: ProductsQuery = {}): Promise<ProductsResponse> {
    try {
      const params = new URLSearchParams();
      
      // Add query parameters
      if (query.page) params.append('page', query.page.toString());
      if (query.perPage) params.append('perPage', query.perPage.toString());
      if (query.search) params.append('search', query.search);
      if (query.categoryId) params.append('categoryId', query.categoryId);
      if (query.isActive) params.append('isActive', query.isActive);

      const url = `${API_ENDPOINTS.PRODUCTS.LIST}?${params.toString()}`;
      const response = await apiClient.get(url, {
        requiresAuth: true,
      });

      // The response from apiClient.get() is the full axios response.data
      // which has the structure: { status, error, message, data: Product[], pagination }
      if (response.error) {
        throw new Error(response.message || 'Failed to fetch products');
      }

      // Extract the products and pagination from the response
      const responseData = response as unknown as ProductsApiResponseWrapper;
      const productsData = responseData.data as Product[];
      const paginationData = responseData.pagination;

      return {
        data: productsData,
        pagination: paginationData
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
      throw new Error(errorMessage);
    }
  }

  async getProduct(productId: string): Promise<Product> {
    try {
      const response = await apiClient.get<Product>(
        `${API_ENDPOINTS.PRODUCTS.DETAIL}/${productId}`,
        { requiresAuth: true }
      );

      if (response.error || !response.data) {
        throw new Error(response.message || 'Failed to fetch product');
      }

      return response.data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product';
      throw new Error(errorMessage);
    }
  }

  async getProductDetails(productId: string): Promise<Product> {
    try {
      const response = await apiClient.get(
        `${API_ENDPOINTS.PRODUCTS.ITEM_INFO}/${productId}`,
        { requiresAuth: true }
      );

      if (response.error || !response.data) {
        throw new Error(response.message || 'Failed to fetch product details');
      }

      // The API returns { status, error, message, data: Product }
      // apiClient.get returns the full response, so response.data contains the Product
      return response.data as Product;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product details';
      throw new Error(errorMessage);
    }
  }

  async createProduct(productData: CreateProductRequest): Promise<Product> {
    try {
      // Validate product data
      const validationErrors = validateProductData(productData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      // Validate images
      const imageErrors = validateProductImages(productData.images);
      if (imageErrors.length > 0) {
        throw new Error(imageErrors.join(', '));
      }

      // Step 1: Create product (JSON)
      const productPayload = createProductPayload(productData);
      const createResponse = await apiClient.post<Product>(
        API_ENDPOINTS.PRODUCTS.CREATE,
        productPayload,
        { requiresAuth: true }
      );

      if (createResponse.error || !createResponse.data) {
        throw new Error(createResponse.message || 'Failed to create product');
      }

      const createdProduct = createResponse.data;

      // Step 2: Upload images (FormData)
      if (productData.images.length > 0) {
        await this.uploadProductImages({
          productId: createdProduct.productId,
          images: productData.images
        });
      }

      return createdProduct;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create product';
      throw new Error(errorMessage);
    }
  }

  async uploadProductImages(uploadData: UploadProductImagesRequest): Promise<void> {
    try {
      // Validate inputs
      if (!uploadData.productId) {
        throw new Error('Product ID is required for image upload');
      }
      
      if (!uploadData.images || uploadData.images.length === 0) {
        throw new Error('No images provided for upload');
      }

      // Validate each image
      for (const image of uploadData.images) {
        if (!image || !(image instanceof File)) {
          throw new Error('Invalid image file provided');
        }
        if (image.size === 0) {
          throw new Error(`Image ${image.name} is empty`);
        }
      }

      const formData = createImageFormData(uploadData.images);

      // Debug: Log what we're sending
      console.log('🔍 Uploading images for product:', uploadData.productId);
      console.log('🔍 Number of images:', uploadData.images.length);
      console.log('🔍 FormData entries:');
      for (const [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value instanceof File ? `File(${value.name}, ${value.size} bytes)` : value);
      }

      const response = await apiClient.post(
        `${API_ENDPOINTS.PRODUCTS.UPLOAD_IMAGES}/${uploadData.productId}`,
        formData,
        { 
          requiresAuth: true,
          isFormData: true
        }
      );

      if (response.error) {
        console.error('❌ Image upload failed:', response);
        throw new Error(response.message || 'Failed to upload product images');
      }

      console.log('✅ Images uploaded successfully');
    } catch (error) {
      console.error('❌ Image upload error:', error);
      
      // If it's an API error with response data, log more details
      if (error && typeof error === 'object' && 'response' in error) {
        console.error('❌ Full error response:', (error as any).response);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload product images';
      throw new Error(errorMessage);
    }
  }

  async updateProduct(productData: UpdateProductRequest): Promise<Product> {
    try {
      const { productId, images, ...updateData } = productData;
      
      // Step 1: Update product data (JSON) using new edit endpoint
      const editPayload = createEditProductPayload(updateData);
      const response = await apiClient.put<Product>(
        `${API_ENDPOINTS.PRODUCTS.EDIT}/${productId}`,
        editPayload,
        { requiresAuth: true }
      );

      if (response.error || !response.data) {
        throw new Error(response.message || 'Failed to update product');
      }

      // Step 2: Upload new images if provided
      if (images && images.length > 0) {
        await this.uploadProductImages({
          productId,
          images
        });
      }

      return response.data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update product';
      throw new Error(errorMessage);
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      const response = await apiClient.delete(
        `${API_ENDPOINTS.PRODUCTS.DELETE}/${productId}`,
        { requiresAuth: true }
      );

      if (response.error) {
        throw new Error(response.message || 'Failed to delete product');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete product';
      throw new Error(errorMessage);
    }
  }

  async toggleProductStatus(productId: string, isActive: boolean): Promise<Product> {
    try {
      const response = await apiClient.patch<Product>(
        `${API_ENDPOINTS.PRODUCTS.UPDATE}/${productId}`,
        { isActive: isActive ? '1' : '0' },
        { requiresAuth: true }
      );

      if (response.error || !response.data) {
        throw new Error(response.message || 'Failed to update product status');
      }

      return response.data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update product status';
      throw new Error(errorMessage);
    }
  }
}

// Export singleton instance
export const productsService = new ProductsService();