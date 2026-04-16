import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  LayoutDashboard, 
  Settings, 
  BarChart3, 
  Cpu, 
  Bell, 
  Activity,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { t } = useLanguage();

  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboardTitle'), active: true },
    { icon: BarChart3, label: 'Reports' },
    { icon: Cpu, label: 'Machines' },
    { icon: Activity, label: 'Real-time' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 border-r border-slate-700/50 bg-slate-900/50 backdrop-blur-xl h-screen flex flex-col sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Activity className="text-white" size={20} />
          </div>
          <span className="font-bold text-xl premium-gradient-text tracking-tight">MOS DASH</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ x: 4 }}
            className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
              item.active 
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon size={18} />
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            {item.active && <ChevronRight size={14} />}
          </motion.div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Manager User</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
