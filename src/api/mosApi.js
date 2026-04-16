import axios from 'axios';

const API_KEY = import.meta.env.VITE_MOS_API_KEY || 'MOS_API_83d2f91a6c5b0b4e2d8e4f5a1c2d3e4f';
const BASE_URL = import.meta.env.DEV ? '' : 'https://mosdatabase-backend.k9pirj.easypanel.host';

const mosApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-API-Key': API_KEY,
    'Accept': 'application/json'
  }
});

export const getProductionSummary = async () => {
  const response = await mosApi.get('/api/production-summary');
  return response.data;
};

export const getProductionAnalytics = async () => {
  const response = await mosApi.get('/api/production-analytics');
  return response.data;
};

export const getBoardCounts = async () => {
  const response = await mosApi.get('/api/orders/board-counts');
  return response.data;
};

export default mosApi;
