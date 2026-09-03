'use client';

import React from 'react';
import {
  ResponsiveContainer,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from 'recharts';
import { cn } from '@/lib/utils';

export interface FighterRadarChartProps {
  stats: {
    striking?: number;
    wrestling?: number;
    clinch?: number;
    groundGame?: number;
    defense?: number;
    cardio?: number;
    [key: string]: any;
  };
  label?: string;
  color?: string;
  secondStats?: any;
  secondLabel?: string;
  secondColor?: string;
  size?: number;
  className?: string;
}

const STAT_CONFIG = [
  { key: 'striking', label: 'Đánh Đứng' },
  { key: 'wrestling', label: 'Vật' },
  { key: 'clinch', label: 'Khóa Siết' },
  { key: 'groundGame', label: 'Địa Chiến' },
  { key: 'defense', label: 'Phòng Thủ' },
  { key: 'cardio', label: 'Thể Lực' }
];

export function RadarChart({
  stats,
  label = 'Chỉ số',
  color = '#ef4444',
  secondStats,
  secondLabel = 'Đối thủ',
  secondColor = '#f59e0b',
  size = 280,
  className
}: FighterRadarChartProps) {
  // 6 martial arts dimensions with exact, concise terminology
  const data = STAT_CONFIG.map(({ key, label: subjectName }) => {
    const val = typeof stats[key] === 'number' ? stats[key] : 3;
    const item: any = {
      subject: subjectName,
      fullMark: 5,
      [label]: val,
    };
    if (secondStats) {
      item[secondLabel] = typeof secondStats[key] === 'number' ? secondStats[key] : 3;
    }
    return item;
  });

  return (
    <div className={cn("w-full flex justify-center items-center select-none overflow-visible", className)} style={{ height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="58%" data={data}>
          <PolarGrid stroke="#222c48" strokeDasharray="2 2" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#e2e8f0', fontSize: 12, fontWeight: 700 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
          <Radar
            name={label}
            dataKey={label}
            stroke={color}
            strokeWidth={2}
            fill={color}
            fillOpacity={0.35}
            isAnimationActive={true}
          />
          {secondStats && (
            <Radar
              name={secondLabel}
              dataKey={secondLabel}
              stroke={secondColor}
              strokeWidth={2}
              fill={secondColor}
              fillOpacity={0.3}
              isAnimationActive={true}
            />
          )}
          <Tooltip 
            contentStyle={{
              backgroundColor: '#0c101e',
              borderColor: '#263353',
              borderRadius: '12px',
              fontSize: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
            }}
            itemStyle={{ color: '#fff', fontWeight: 'bold' }}
            formatter={(val: any) => [`${val} / 5 điểm`, label]}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
