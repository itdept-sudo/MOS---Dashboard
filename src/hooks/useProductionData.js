import { useState, useEffect, useCallback } from 'react';
import { getProductionSummary, getProductionAnalytics, getBoardCounts } from '../api/mosApi';

export const useProductionData = (refreshInterval = 30000) => {
  const [data, setData] = useState({
    summary: {},
    analytics: null,
    boardCounts: [],
    loading: true,
    lastUpdate: new Date()
  });

  const fetchData = useCallback(async () => {
    try {
      const [summary, analytics, boardCounts] = await Promise.all([
        getProductionSummary(),
        getProductionAnalytics(),
        getBoardCounts()
      ]);

      setData({
        summary,
        analytics,
        boardCounts,
        loading: false,
        lastUpdate: new Date()
      });
    } catch (error) {
      console.error('Error fetching production data:', error);
      setData(prev => ({ ...prev, loading: prev.analytics === null }));
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return { ...data, refresh: fetchData };
};
