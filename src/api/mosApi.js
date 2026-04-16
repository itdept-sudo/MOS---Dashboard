import axios from 'axios';

// La API Key se lee de Vercel por seguridad
const API_KEY = import.meta.env.VITE_MOS_API_KEY;

// DEBE ESTAR VACÍO PARA USAR EL PUENTE DE VERCEL
const BASE_URL = ''; 

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
