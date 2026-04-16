import React from 'react';
import { motion } from 'framer-motion';

const KPICard = ({ title, value, icon: Icon, trend, color = "blue" }) => {
  const colorVariants = {
    blue: "from-blue-500/20 to-indigo-500/10 border-blue-500/20 text-blue-400",
    green: "from-emerald-500/20 to-teal-500/10 border-emerald-500/20 text-emerald-400",
    amber: "from-amber-500/20 to-orange-500/10 border-amber-500/20 text-amber-400",
    rose: "from-rose-500/20 to-pink-500/10 border-rose-500/20 text-rose-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-6 flex items-start gap-4 flex-1 bg-gradient-to-br ${colorVariants[color]}`}
    >
      <div className={`p-3 rounded-xl bg-slate-900/50 border border-white/5`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <h3 className="text-3xl font-bold mt-1 tracking-tight">{value}</h3>
        {trend && (
          <p className="text-xs mt-2 flex items-center gap-1">
            <span className={trend > 0 ? 'text-emerald-400' : 'text-rose-400'}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
            <span className="text-slate-500">vs last hour</span>
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default KPICard;
