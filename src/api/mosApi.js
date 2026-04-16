import axios from 'axios';

// El puente Vercel (Dejar vacío)
const BASE_URL = '';

const mosApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Esto es vital para que guarde el Token de Sesión
  headers: {
    'Accept': 'application/json'
  }
});

let isLoggingIn = false;
let loginPromise = null;

// Esta función hace el inicio de sesión automático usando tu correo
const autoLogin = async () => {
  const email = 'test.dashboard@prosper-mfg.com';
  const password = 'Tjgnetmgr@2026';
  await axios.post('/api/auth/login', { email, password }, { baseURL: BASE_URL, withCredentials: true });
};

// "Interceptor": Revisa todas las peticiones
mosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si falla por 401 (No Autorizado) y es la primera vez que falla
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!isLoggingIn) {
        isLoggingIn = true;
        loginPromise = autoLogin().finally(() => { isLoggingIn = false; });
      }
      
      await loginPromise; // Espera a que el LogIn termine silenciosamente
      return mosApi(originalRequest); // Vuelve a intentar pedir los datos mágicamente
    }
    return Promise.reject(error);
  }
);

// Peticiones
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
