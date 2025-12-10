import React, { useState, useEffect } from 'react';
import { ScanLine, Radio, Activity, Timer } from 'lucide-react';

export const LoadingView: React.FC = () => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    // Update every 50ms for a smooth counter effect
    const intervalId = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  // Format time to seconds with 1 decimal place (e.g., "1.5s")
  const formattedTime = (elapsedTime / 1000).toFixed(1);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center space-y-8 animate-scale-in">
      <div className="relative">
        {/* Pulse Effect Background */}
        <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-75"></div>
        <div className="absolute inset-0 bg-emerald-200 rounded-full animate-pulse-slow opacity-50"></div>
        
        {/* Icon Container */}
        <div className="relative bg-white p-8 rounded-full shadow-xl border-4 border-emerald-50 z-10">
          <ScanLine className="w-16 h-16 text-emerald-600 animate-pulse" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800">
            Executando Auditoria...
          </h2>
          <p className="text-slate-500 max-w-xs mx-auto">
            Processando dados e validando presenças no sistema.
          </p>
        </div>

        {/* Timer Counter */}
        <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2.5 px-6 py-2 bg-slate-100 border border-slate-200 rounded-full text-slate-700 shadow-sm transition-all">
                <Timer className="w-5 h-5 text-emerald-600" />
                <span className="font-mono text-xl font-bold tracking-widest tabular-nums">
                    {formattedTime}s
                </span>
            </div>
        </div>
      </div>

      <div className="flex gap-4 text-sm text-slate-400 font-medium justify-center">
        <span className="flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 animate-bounce text-emerald-500" /> Conectando
        </span>
        <span className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-500" /> Processando
        </span>
      </div>
    </div>
  );
};
