import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Settings as SettingsIcon, Bell, Palette, Globe, Shield } from 'lucide-react';

const Settings = () => {
  const { t } = useLanguage();

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#0f172a] min-h-screen">
      <header className="mb-8 border-b border-slate-700/50 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <SettingsIcon className="text-slate-400" size={32} />
          Executive Preferences
        </h1>
        <p className="text-slate-400 mt-2 text-sm">
          Customize your dashboard experience and alerts.
        </p>
      </header>
      
      <div className="max-w-3xl space-y-6">
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Globe className="text-blue-400" size={20} /> Regional Settings
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-800/30 p-4 rounded-xl">
              <div>
                <p className="text-white font-medium">Dashboard Language</p>
                <p className="text-slate-400 text-sm">Switch between English and Spanish.</p>
              </div>
              <button className="glass-button text-sm">English</button>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Bell className="text-amber-400" size={20} /> Alerts & Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-800/30 p-4 rounded-xl">
              <div>
                <p className="text-white font-medium">Production Critical Failure</p>
                <p className="text-slate-400 text-sm">Email me when a machine node goes offline.</p>
              </div>
              <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center bg-slate-800/30 p-4 rounded-xl">
              <div>
                <p className="text-white font-medium">Target Met Celebration</p>
                <p className="text-slate-400 text-sm">Animate screen when an order finishes.</p>
              </div>
              <div className="w-12 h-6 bg-slate-600 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
