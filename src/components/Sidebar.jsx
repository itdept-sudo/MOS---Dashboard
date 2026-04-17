import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LayoutDashboard, Settings, BarChart3, Cpu, Activity, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { t } = useLanguage();

  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboardTitle'), path: '/dashboard' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: Cpu, label: 'Machines', path: '/machines' },
    { icon: Activity, label: 'Real-time', path: '/real-time' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-64 border-r border-slate-700/50 bg-slate-900/50 backdrop-blur-xl h-screen flex flex-col sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
          <Activity className="text-white" size={20} />
        </div>
        <span className="font-bold text-xl text-white">MOS DASH</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-between p-3 rounded-xl transition-all ${
                isActive ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3 w-full">
                  <item.icon size={18} />
                  <span className="font-medium text-sm">{item.label}</span>
                </motion.div>
                {isActive && <ChevronRight size={14} />}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
