import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="flex h-screen bg-[#0f172a] text-slate-200">
        <Sidebar />
        <Dashboard />
      </div>
    </LanguageProvider>
  );
}

export default App;
