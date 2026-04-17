import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProductionData } from '../hooks/useProductionData';
import { motion } from 'framer-motion';
import { Cpu, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Machines = () => {
  const { t } = useLanguage();
  const { analytics, lastUpdate, loading } = useProductionData();

  const machines = analytics?.by_machine || [];
  
  // Calcular máquina con mayor producción para resaltar
  const maxProduced = Math.max(...machines.map(m => m.produced || 0));

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#0f172a] min-h-screen">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold premium-gradient-text tracking-tight flex items-center gap-3">
            <Cpu className="text-indigo-400" size={32} />
            Machines Status
          </h1>
          <p className="text-slate-400 mt-2 text-sm flex items-center gap-2">
            <Clock size={14} className="text-slate-500" /> 
            Last synchronized: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700/50">
           <span className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${loading ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${loading ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
          </span>
          <span className="text-sm font-medium text-slate-300">
            {loading ? 'Refreshing...' : 'All Systems Online'}
          </span>
        </div>
      </header>

      {/* Grid de Máquinas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {machines.map((machine, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={machine.machine} 
            className="glass-card relative overflow-hidden group"
          >
            {/* Decal background */}
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Cpu size={120} />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-200">{machine.machine}</h3>
                  <p className="text-sm text-slate-500">Production Node</p>
                </div>
                <div className={`p-2 rounded-lg ${machine.produced > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700/30 text-slate-400'}`}>
                   {machine.produced > 0 ? <CheckCircle2 size={24}/> : <AlertCircle size={24}/>}
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-4xl font-black text-white tracking-tight">
                    {machine.produced?.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">Units Produced</p>
                </div>
                {machine.produced === maxProduced && machine.produced > 0 && (
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
                    Top Performer
                  </span>
                )}
              </div>
            </div>
            
            {/* Progress/Activity bar along bottom */}
            <div className="h-1.5 w-full bg-slate-800 absolute bottom-0 left-0">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: maxProduced > 0 ? `${(machine.produced / maxProduced) * 100}%` : '0%' }}
                 transition={{ duration: 1, ease: "easeOut" }}
                 className={`h-full ${machine.produced === maxProduced ? 'bg-amber-500' : 'bg-indigo-500'}`}
               />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Global Machine Analytics */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <h2 className="text-lg font-semibold text-slate-200 mb-6">Cross-Machine Production Comparison</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <BarChart data={machines} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="machine" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#334155', opacity: 0.2 }}
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }} 
              />
              <Bar dataKey="produced" radius={[6, 6, 0, 0]}>
                {machines.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.produced === maxProduced ? '#f59e0b' : '#6366f1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Machines;
