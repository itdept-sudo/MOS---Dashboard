import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import { LanguageProvider } from './context/LanguageContext';

// Plantilla temporal para pantallas en construcción
const Placeholder = ({ title }) => (
  <div className="flex-1 bg-[#0f172a] p-8 text-white flex items-center justify-center text-xl border border-slate-700/50">
    🛠️ {title} (En Construcción)
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="flex h-screen bg-[#0f172a] text-slate-200">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Placeholder title="Reports" />} />
            <Route path="/machines" element={<Placeholder title="Machines" />} />
            <Route path="/real-time" element={<Placeholder title="Real-time" />} />
            <Route path="/settings" element={<Placeholder title="Settings" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
