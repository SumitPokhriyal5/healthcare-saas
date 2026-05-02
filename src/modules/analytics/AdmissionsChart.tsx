import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';
import type { AdmissionPoint } from './types';
import { memo } from 'react';

interface Props {
  data: AdmissionPoint[];
}

function AdmissionsChartComponent({ data }: Props) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="label" stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          <Line
            type="monotone"
            dataKey="admissions"
            name="Admissions"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="discharges"
            name="Discharges"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export const AdmissionsChart = memo(AdmissionsChartComponent);
