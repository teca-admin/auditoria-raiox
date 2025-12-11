import React, { useState, useEffect } from 'react';
import { ScanLine, Radio, Activity, Timer } from 'lucide-react';

export const LoadingView: React.FC = () => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const intervalId = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = (elapsedTime / 1000).toFixed(1);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center space-y-8 animate-scale-in z-20">
      <div className="relative">
        {/* Minimalist Pulse - White/Grey */}
        <div className="absolute inset-0 bg-white/10 rounded-full animate-ping opacity-50"></div>
        <div className="absolute inset-0 bg-white/5 rounded-full animate-pulse opacity-30"></div>
        
        {/* Icon Container - Glass */}
        <div className="relative bg-black/80 backdrop-blur-xl p-5 rounded-full border border-white/10 z-10 shadow-2xl">
          <ScanLine className="w-8 h-8 text-white animate-pulse" strokeWidth={1.5} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-white tracking-wide">
            Processando Auditoria
          </h2>
          <p className="text-neutral-500 text-xs max-w-[180px] mx-auto leading-relaxed">
            Sincronizando dados com o servidor remoto...
          </p>
        </div>

        {/* Timer Counter - Minimalist */}
        <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/5 border border-white/5 rounded-full text-neutral-300">
                <Timer className="w-3 h-3 text-neutral-400" />
                <span className="font-mono text-sm font-medium tracking-wider tabular-nums">
                    {formattedTime}s
                </span>
            </div>
        </div>
      </div>

      <div className="flex gap-4 text-[10px] text-neutral-600 font-bold uppercase tracking-widest justify-center">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Conectado
        </span>
        <span className="flex items-center gap-1.5">
          <Activity className="w-3 h-3 animate-spin text-neutral-500" /> Processando
        </span>
      </div>
    </div>
  );
};