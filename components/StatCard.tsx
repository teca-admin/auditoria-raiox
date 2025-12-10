
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  className?: string; // Allow full tailwind class overrides
  colorClass?: string; // Deprecated but kept for backward compat if needed
  iconColor?: string; // Specific color for the icon if needed
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
  // Helper to format value if it is a number, otherwise pass string through
  const displayValue = typeof value === 'number' 
    ? value.toLocaleString('pt-BR') 
    : value;

  return (
    <div 
      className={`w-full max-w-md p-6 rounded-2xl shadow-lg transform transition-all duration-700 ease-out animate-scale-in flex flex-col items-center justify-center gap-1 ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="text-sm font-bold tracking-widest uppercase opacity-80 text-center mb-1">
        {label}
      </h3>
      <div className="flex items-center justify-center gap-3">
        {Icon && <Icon className={`w-8 h-8 ${iconColor || 'opacity-90'}`} strokeWidth={2.5} />}
        <span className="text-5xl font-extrabold tracking-tight leading-none">
          {displayValue}
        </span>
      </div>
    </div>
  );
};
