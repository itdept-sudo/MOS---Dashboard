import React from 'react';
import { motion } from 'framer-motion';

const KPICard = ({ title, value, icon: Icon, trend }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="brand-card p-6 flex items-start gap-4 flex-1"
    >
      <div className="p-3 rounded bg-[#111111] border border-[#333333] text-prosper-blue">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">{title}</p>
        <h3 className="text-3xl font-bold mt-1 tracking-tight text-white">{value}</h3>
        {trend && (
          <p className="text-xs mt-2 flex items-center gap-1">
            <span className={trend > 0 ? 'text-prosper-blue font-bold' : 'text-gray-400'}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
            <span className="text-gray-500 uppercase tracking-wider text-[10px]">vs last hour</span>
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default KPICard;
