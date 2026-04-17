import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProductionData } from '../hooks/useProductionData';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Layers, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const { t } = useLanguage();
  const { summary, analytics } = useProductionData();

  // Create timeline data for the area chart based on active orders
  const reportData = Object.entries(summary || {}).map(([id, info]) => ({
    name: `Order ${id.substring(id.length - 4)}`, // Las 4 chars of ID
    target: info.total_target || 0,
    produced: info.total_produced || 0,
  }));

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#0f172a] min-h-screen">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold premium-gradient-text tracking-tight flex items-center gap-3">
            <BarChart3 className="text-blue-400" size={32} />
            Production Reports
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            High-level executive metrics and order fulfillment tracking.
          </p>
        </div>
        <button className="glass-button bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg shadow-blue-500/20">
          Export as PDF
        </button>
      </header>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -right-2 -top-2 opacity-5"><TrendingUp size={100} /></div>
          <p className="text-slate-400 text-sm font-medium mb-1">Total Target Volume</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white">{analytics?.total_target?.toLocaleString() || '0'}</span>
            <span className="text-sm font-medium text-blue-400">units</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -right-2 -top-2 opacity-5"><Layers size={100} /></div>
          <p className="text-slate-400 text-sm font-medium mb-1">Total Produced</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white">{analytics?.total_produced?.toLocaleString() || '0'}</span>
            <span className="text-sm font-medium text-emerald-400">units</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-4">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (analytics?.total_produced / analytics?.total_target) * 100 || 0)}%` }}></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -right-2 -top-2 opacity-5"><Activity size={100} /></div>
          <p className="text-slate-400 text-sm font-medium mb-1">Global Efficiency</p>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-black ${analytics?.efficiency >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {analytics?.efficiency || 0}%
            </span>
          </div>
        </motion.div>
      </div>

      {/* Target vs Produced Area Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <h2 className="text-lg font-semibold text-slate-200 mb-6 font-display">Order Fulfillment (Target vs Actual)</h2>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <AreaChart data={reportData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProduced" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }} 
              />
              <Area type="monotone" dataKey="target" stroke="#94a3b8" fillOpacity={1} fill="url(#colorTarget)" name="Target Volume" />
              <Area type="monotone" dataKey="produced" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorProduced)" name="Actually Produced" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;
