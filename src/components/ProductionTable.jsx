import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const ProductionTable = ({ data }) => {
  const { t } = useLanguage();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="text-slate-500 text-xs uppercase tracking-wider border-b border-slate-700/50">
          <tr>
            <th className="px-6 py-4 font-semibold">{t('orderNumber')}</th>
            <th className="px-6 py-4 font-semibold">Produced Units</th>
            <th className="px-6 py-4 font-semibold">{t('status')}</th>
            <th className="px-6 py-4 font-semibold">Last Activity</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/30">
          <AnimatePresence mode='popLayout'>
            {data.map((row, idx) => (
              <motion.tr 
                key={row.order_id || idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-slate-700/20 transition-colors"
              >
                <td className="px-6 py-4">
                  <span className="font-mono text-blue-400 font-medium">{row.order_id}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    {row.total_produced.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    row.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    row.status === 'in_progress' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 text-sm">
                   Recent
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="py-12 text-center text-slate-500 flex flex-col items-center gap-2">
          <p>{t('noData')}</p>
        </div>
      )}
    </div>
  );
};

export default ProductionTable;
