import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProductionData } from '../hooks/useProductionData';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Radio, Box, Terminal } from 'lucide-react';

const RealTime = () => {
  const { t } = useLanguage();
  const { summary, loading } = useProductionData();

  // Create a simulated "Live Feed" of events out of the summary state
  const logs = Object.entries(summary || {}).map(([id, info], index) => {
    const isCompleted = info.total_produced >= info.total_target;
    return {
      id: `log-${id}`,
      time: new Date(Date.now() - index * 60000).toLocaleTimeString(), // simulated time
      message: `Order ${id.substring(id.length - 6)} logged ${info.total_produced} units / ${info.total_target}`,
      status: isCompleted ? 'success' : 'processing',
      order: id
    };
  });

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#0f172a] min-h-screen">
      <header className="mb-8 flex items-center justify-between border-b border-slate-700/50 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Radio className="text-rose-500 animate-pulse" size={32} />
            Live Event Feed
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Real-time telemetry stream from production nodes.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
          <span className="text-sm text-rose-400 font-mono font-bold tracking-widest uppercase">Live</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Terminal Live Feed Simulation */}
        <div className="lg:col-span-2 glass-card border border-slate-700/50 flex flex-col h-[600px] overflow-hidden bg-[#020617] relative">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-[#0f172a]">
            <Terminal size={16} className="text-slate-500" />
            <span className="text-xs font-mono text-slate-500">production_stream.sh</span>
          </div>
          <div className="flex-1 p-6 overflow-y-auto font-mono text-sm space-y-3 custom-scrollbar">
            <AnimatePresence>
              {logs.map((log, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={log.id} 
                  className="flex items-start gap-4 border-b border-slate-800/50 pb-3"
                >
                  <span className="text-slate-500 shrink-0">[{log.time}]</span>
                  <span className={`shrink-0 ${log.status === 'success' ? 'text-emerald-500' : 'text-blue-500'}`}>
                    {log.status === 'success' ? 'COMPLETED' : 'PROCESSING'}
                  </span>
                  <span className="text-slate-300 break-all">{log.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <div className="text-slate-500 animate-pulse flex gap-2 items-center">
                 <span className="w-2 h-4 bg-slate-500 block animate-ping"></span> Listening for incoming data packets...
              </div>
            )}
          </div>
        </div>

        {/* System Health */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <Activity size={18} className="text-emerald-400" />
              Node Health
            </h3>
            <div className="space-y-4">
              {['Database', 'API Proxy', 'WebSocket', 'Auth'].map((service, i) => (
                <div key={service} className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">{service}</span>
                  <span className="text-emerald-400 text-xs px-2 py-1 bg-emerald-500/10 rounded border border-emerald-500/20">Operational</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-indigo-900/40 to-[#0f172a]">
             <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4 border border-indigo-500/30">
               <Box className="text-indigo-400" size={24} />
             </div>
             <h4 className="text-white font-medium mb-1">Active Batch Processing</h4>
             <p className="text-slate-400 text-sm mb-4">Currently tracking {logs.length} active orders pushing real-time telemetry.</p>
             <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
               <div className="w-full h-full bg-indigo-500 animate-[pulse_2s_ease-in-out_infinite]" style={{ transformOrigin: 'left' }}></div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RealTime;
