import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import prosperLogo from '../assets/prosper-logo.png';
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
    <aside className="w-64 border-r border-[#333333] bg-prosper-dark-gray h-screen flex flex-col sticky top-0">
      <div className="px-6 py-5 border-b border-[#333333] flex items-center">
        <div className="bg-white rounded px-3 py-2 inline-flex">
          <img 
            src={prosperLogo} 
            alt="Prosper Manufacturing" 
            className="h-8 w-auto object-contain"
          />
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ x: 4 }}
            className={`flex items-center justify-between p-3 rounded transition-all cursor-pointer ${
              item.active 
                ? 'bg-prosper-blue text-white' 
                : 'text-gray-400 hover:text-white hover:bg-[#333333]'
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

      <div className="p-4 border-t border-[#333333]">
        <div className="flex items-center gap-3 p-3 bg-[#333333]/50 rounded">
          <div className="w-8 h-8 rounded bg-prosper-blue flex items-center justify-center font-bold text-xs text-white">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-white">Manager User</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
