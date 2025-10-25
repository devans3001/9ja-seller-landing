import { useState, useCallback } from 'react';
import { dashboardService } from '@/services/dashboard.service';
import type { DashboardSummary } from '@/types';

interface UseDashboardReturn {
  dashboardData: DashboardSummary | null;
  isLoading: boolean;
  error: string | null;
  fetchDashboardSummary: () => Promise<void>;
  refreshDashboard: () => Promise<void>;
}

export const useDashboard = (): UseDashboardReturn => {
  const [dashboardData, setDashboardData] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardSummary = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await dashboardService.getDashboardSummary();
      setDashboardData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard data';
      setError(errorMessage);
      console.error('Dashboard fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshDashboard = useCallback(async () => {
    await fetchDashboardSummary();
  }, [fetchDashboardSummary]);

  return {
    dashboardData,
    isLoading,
    error,
    fetchDashboardSummary,
    refreshDashboard,
  };
};