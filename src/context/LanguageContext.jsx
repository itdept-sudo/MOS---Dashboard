import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  es: {
    dashboardTitle: 'Panel de Producción',
    totalOrders: 'Pedidos Totales',
    activeMachines: 'Máquinas Activas',
    productionFlow: 'Flujo de Producción',
    hourlyTrends: 'Tendencias por Hora',
    refreshing: 'Actualizando...',
    lastUpdate: 'Última actualización',
    orderNumber: 'Núm. Pedido',
    status: 'Estado',
    machine: 'Máquina',
    actions: 'Acciones',
    switchLanguage: 'English',
    noData: 'Sin datos disponibles',
    efficiency: 'Eficiencia',
    pending: 'Pendientes',
    inProgress: 'En Proceso'
  },
  en: {
    dashboardTitle: 'Production Dashboard',
    totalOrders: 'Total Orders',
    activeMachines: 'Active Machines',
    productionFlow: 'Production Flow',
    hourlyTrends: 'Hourly Trends',
    refreshing: 'Refreshing...',
    lastUpdate: 'Last update',
    orderNumber: 'Order No.',
    status: 'Status',
    machine: 'Machine',
    actions: 'Actions',
    switchLanguage: 'Español',
    noData: 'No data available',
    efficiency: 'Efficiency',
    pending: 'Pending',
    inProgress: 'In Progress'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('es');

  const toggleLanguage = () => {
    setLang(prev => (prev === 'es' ? 'en' : 'es'));
  };

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
