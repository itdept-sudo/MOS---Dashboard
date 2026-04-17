import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProductionData } from '../hooks/useProductionData';
import KPICard from '../components/KPICard';
import { ProductionAreaChart, MachineBarChart } from '../components/Charts';
import ProductionTable from '../components/ProductionTable';
import { 
  BarChart3, 
  RefreshCcw, 
  Layers, 
  Zap, 
  Activity,
  Globe,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { t, toggleLanguage } = useLanguage();
  const { summary, analytics, loading, lastUpdate, refresh } = useProductionData();

  // Map machine data for chart
  const machineData = analytics?.by_machine?.map(item => ({
    name: item.machine,
    count: item.produced
  })) || [];

  // Convert summary map to array for table
  const monitorData = Object.entries(summary || {}).map(([id, info]) => ({
    order_id: id,
    total_produced: info.total_produced,
    status: info.total_produced > 0 ? 'in_progress' : 'pending',
    timestamp: new Date() // Summary doesn't provide time, using current
  })).slice(0, 10); // Show top 10

  const mockHourlyData = [
    { name: '08:00', total: 4500 },
    { name: '10:00', total: 5200 },
    { name: '12:00', total: 4800 },
    { name: '14:00', total: 6100 },
    { name: '16:00', total: 5500 },
    { name: '18:00', total: 6700 },
  ];

  return (
    <div className="flex-1 min-h-screen bg-prosper-navy overflow-hidden flex flex-col">
      <header className="px-8 py-5 border-b border-[#333333] flex items-center justify-between bg-prosper-dark-gray">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight uppercase">Print. Pack. Ship. Done.</h1>
          <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
            <Activity size={14} className="text-prosper-blue" />
            {t('lastUpdate')}: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleLanguage} className="brand-button-outline">
            <Globe size={16} /> {t('switchLanguage')}
          </button>
          
          <button 
            onClick={refresh} 
            disabled={loading}
            className={`p-2 rounded border border-[#333333] bg-[#1A1A1A] text-gray-400 hover:text-prosper-blue transition-all ${loading ? 'animate-spin' : ''}`}
          >
            <RefreshCcw size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard 
             title={t('totalOrders')} 
             value={analytics?.total_produced?.toLocaleString() || '0'} 
             icon={Layers} 
             color="blue"
          />
          <KPICard 
             title="Target" 
             value={analytics?.total_target?.toLocaleString() || '0'} 
             icon={Target} 
             color="rose"
          />
          <KPICard 
             title={t('efficiency')} 
             value={`${analytics?.efficiency || 0}%`} 
             icon={Zap} 
             color="green"
          />
          <KPICard 
             title="Logs Count" 
             value={analytics?.total_logs || 0} 
             icon={Activity} 
             color="amber"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="brand-card p-6">
            <h2 className="font-semibold text-white mb-6 uppercase tracking-wide text-sm">{t('hourlyTrends')} (Mock)</h2>
            <ProductionAreaChart data={mockHourlyData} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="brand-card p-6">
            <h2 className="font-semibold text-white mb-6 uppercase tracking-wide text-sm">{t('activeMachines')} Performance</h2>
            <MachineBarChart data={machineData} />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="brand-card">
          <div className="p-6 border-b border-[#333333] flex items-center justify-between">
            <h2 className="font-semibold text-white uppercase tracking-wide text-sm">Production Summary</h2>
            <span className="flex items-center gap-2 text-xs text-prosper-blue bg-prosper-blue/10 px-2 py-1 rounded border border-prosper-blue/20 uppercase font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-prosper-blue animate-pulse"></span>
              Live
            </span>
          </div>
          <ProductionTable data={monitorData} />
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
