import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';

export const ProductionAreaChart = ({ data }) => (
  <div className="h-64 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1E5BFF" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#1E5BFF" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333333" />
        <XAxis 
          dataKey="name" 
          stroke="#9ca3af" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <YAxis 
          stroke="#9ca3af" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1A1A1A', 
            border: '1px solid #333333',
            borderRadius: '4px',
            color: '#FFFFFF'
          }} 
        />
        <Area 
          type="monotone" 
          dataKey="total" 
          stroke="#1E5BFF" 
          fillOpacity={1} 
          fill="url(#colorProd)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const MachineBarChart = ({ data }) => (
  <div className="h-64 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333333" />
        <XAxis 
          dataKey="name" 
          stroke="#9ca3af" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <YAxis 
          stroke="#9ca3af" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <Tooltip 
          cursor={{ fill: '#333333', opacity: 0.4 }}
          contentStyle={{ 
            backgroundColor: '#1A1A1A', 
            border: '1px solid #333333',
            borderRadius: '4px',
            color: '#FFFFFF'
          }} 
        />
        <Bar 
          dataKey="count" 
          fill="#1E5BFF" 
          radius={[2, 2, 0, 0]} 
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
