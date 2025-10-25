export interface BusinessCategory {
  id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessCategoriesApiResponse {
  status: number;
  error: boolean;
  message: string;
  data: BusinessCategory[];
  pagination: null;
}

export interface BusinessCategoriesState {
  categories: BusinessCategory[];
  isLoading: boolean;
  error: string | null;
}
