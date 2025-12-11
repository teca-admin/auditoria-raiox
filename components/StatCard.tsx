import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  className?: string;
  colorClass?: string;
  iconColor?: string;
  icon?: LucideIcon;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  className = '', 
  iconColor,
  icon: Icon, 
  delay = 0 
}) => {
  const displayValue = typeof value === 'number' 
    ? value.toLocaleString('pt-BR') 
    : value;

  // Glassmorphism Dark Theme Style
  const baseStyle = "bg-white/5 border border-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/10 transition-all duration-500";

  return (
    <div 
      className={`w-full p-4 rounded-xl shadow-2xl flex flex-col items-center justify-center gap-1 animate-scale-in ${baseStyle} ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-300 text-center mb-1">
        {label}
      </h3>
      <div className="flex items-center justify-center gap-3">
        {Icon && <Icon className={`w-5 h-5 ${iconColor || 'text-neutral-400'}`} strokeWidth={2} />}
        <span className="text-2xl font-bold tracking-tight text-white">
          {displayValue}
        </span>
      </div>
    </div>
  );
};