import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const ProductionTable = ({ data }) => {
  const { t } = useLanguage();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="text-gray-400 text-xs uppercase tracking-wider border-b border-[#333333] bg-[#111111]">
          <tr>
            <th className="px-6 py-4 font-semibold">{t('orderNumber')}</th>
            <th className="px-6 py-4 font-semibold">Produced Units</th>
            <th className="px-6 py-4 font-semibold">{t('status')}</th>
            <th className="px-6 py-4 font-semibold">Last Activity</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#333333]">
          <AnimatePresence mode='popLayout'>
            {data.map((row, idx) => (
              <motion.tr 
                key={row.order_id || idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-[#333333]/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <span className="font-mono text-white font-semibold">{row.order_id}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-sm bg-prosper-blue"></div>
                    <span className="text-white font-medium">{row.total_produced.toLocaleString()}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    row.status === 'completed' ? 'bg-[#1A1A1A] text-white border border-[#444444]' :
                    row.status === 'in_progress' ? 'bg-prosper-blue/10 text-prosper-blue border border-prosper-blue/20' :
                    'bg-[#333333] text-gray-400 border border-[#444444]'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400 text-sm">
                   Recent
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="py-12 text-center text-gray-400 flex flex-col items-center gap-2">
          <p>{t('noData')}</p>
        </div>
      )}
    </div>
  );
};

export default ProductionTable;
