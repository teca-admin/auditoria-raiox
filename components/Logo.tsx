import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
        {/* WFS Text - Reduzido de 6rem para 4.8rem (~20%) */}
        <h1 className="text-[4.8rem] font-bold text-white leading-[0.8] tracking-normal lowercase font-sans drop-shadow-lg">
            wfs
        </h1>
        
        {/* PROJETOS Box - Ajustes proporcionais de padding, margem e fonte */}
        <div className="bg-[#35057a] w-[105%] flex justify-center py-1 mt-1.5 shadow-xl">
            <span className="text-[11px] font-bold text-white tracking-[0.35em] uppercase block pl-1">
                PROJETOS
            </span>
        </div>
    </div>
  );
};