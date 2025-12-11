import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
        {/* WFS Text - Reduzido de 7xl para 5xl (~3rem) para atender à solicitação de redução de 20%+ */}
        <h1 className="text-5xl font-bold text-white leading-[0.8] tracking-normal lowercase font-sans drop-shadow-lg">
            wfs
        </h1>
        
        {/* PROJETOS Box - Reduzido proporcionalmente */}
        <div className="bg-[#35057a] w-[110%] flex justify-center py-0.5 mt-1 shadow-xl">
            <span className="text-[8px] font-bold text-white tracking-[0.35em] uppercase block pl-1">
                PROJETOS
            </span>
        </div>
    </div>
  );
};