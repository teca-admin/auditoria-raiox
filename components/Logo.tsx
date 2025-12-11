import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
        {/* WFS Text - Reduzido para text-7xl (~4.5rem) para garantir a redução visual */}
        <h1 className="text-7xl font-bold text-white leading-[0.8] tracking-normal lowercase font-sans drop-shadow-lg">
            wfs
        </h1>
        
        {/* PROJETOS Box - Ajustado para alinhar com o novo tamanho */}
        <div className="bg-[#35057a] w-[105%] flex justify-center py-1 mt-1 shadow-xl">
            <span className="text-[10px] font-bold text-white tracking-[0.35em] uppercase block pl-1">
                PROJETOS
            </span>
        </div>
    </div>
  );
};