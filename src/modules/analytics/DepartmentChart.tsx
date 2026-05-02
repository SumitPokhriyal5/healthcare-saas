import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { DepartmentSlice } from './types';
import { memo } from 'react';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

interface Props {
  data: DepartmentSlice[];
}

function DepartmentChartComponent({ data }: Props) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export const DepartmentChart = memo(DepartmentChartComponent);
