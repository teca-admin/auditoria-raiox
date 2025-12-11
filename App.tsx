
import React, { useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, RotateCcw, UserCheck, Users, UserX, AlertTriangle, Play } from 'lucide-react';
import { AppState, AuditStats } from './types';
import { triggerAudit } from './services/auditService';
import { StatCard } from './components/StatCard';
import { LoadingView } from './components/LoadingView';
import { SplineScene } from './components/SplineScene';
import { SparklesCore } from './components/SparklesCore';
import { Logo } from './components/Logo';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [stats, setStats] = useState<AuditStats | null>(null);

  const handleStartAudit = useCallback(async () => {
    setAppState(AppState.LOADING);
    
    try {
      const data = await triggerAudit();
      setStats(data);
      setAppState(AppState.SUCCESS);
    } catch (error) {
      console.error(error);
      setAppState(AppState.ERROR);
    }
  }, []);

  const handleReset = () => {
    setStats(null);
    setAppState(AppState.IDLE);
  };

  return (
    <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* Background Layer - Native Canvas Sparkles (No external libs) */}
      <div className="w-full absolute inset-0 h-full">
        <SparklesCore
          id="sparkles-bg"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Logo - Always visible in top left */}
      <div className="absolute top-8 left-8 z-50 animate-scale-in">
        <Logo />
      </div>

      {/* Content Layer */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none">
        
        <main className="w-full flex flex-col items-center justify-center relative pointer-events-auto">
          
          {/* STATE: IDLE */}
          {appState === AppState.IDLE && (
            <div className="relative w-full h-screen flex items-center justify-center">
              {/* Background Spline Robot (Visual Context) */}
              <div className="absolute inset-0 w-full h-full z-10 opacity-60">
                 <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJq2n/scene.splinecode" 
                    className="w-full h-full"
                  />
              </div>

              {/* Centered Interaction Button - Purple Play Triangle */}
              <div className="relative z-30 animate-scale-in">
                <button 
                  onClick={handleStartAudit}
                  className="group relative flex flex-col items-center justify-center gap-6 focus:outline-none transition-transform duration-300 active:scale-95"
                >
                  {/* Play Icon */}
                  <div className="relative">
                    <Play 
                        className="w-32 h-32 text-[#8b5cf6] fill-[#8b5cf6] filter drop-shadow-[0_0_20px_rgba(139,92,246,0.6)] group-hover:drop-shadow-[0_0_40px_rgba(139,92,246,0.8)] transition-all duration-500" 
                        strokeWidth={0}
                    />
                  </div>

                  {/* Text */}
                  <span className="text-white font-bold text-2xl tracking-widest uppercase font-sans drop-shadow-lg group-hover:text-white/90">
                    Iniciar Auditoria
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* STATE: LOADING */}
          {appState === AppState.LOADING && (
            <div className="relative z-30">
              <LoadingView />
            </div>
          )}

          {/* STATE: SUCCESS */}
          {appState === AppState.SUCCESS && stats && (
            <div className="w-full flex flex-col items-center space-y-6 animate-scale-in z-30 mt-12">
              
              <div className="text-center space-y-1 mb-2">
                <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  Auditoria concluída
                </h2>
              </div>

              {/* Grid Layout for Cards */}
              <div className="w-full max-w-[280px] flex flex-col gap-3">
                <StatCard 
                  label="Presenças auditadas" 
                  value={stats.total} 
                  icon={Users}
                  delay={100}
                />
                
                <StatCard 
                  label="Presenças validadas" 
                  value={stats.validated} 
                  icon={UserCheck}
                  iconColor="text-emerald-400"
                  delay={200}
                />
                
                <StatCard 
                  label="Presenças NÃO validadas" 
                  value={stats.invalid} 
                  icon={UserX}
                  iconColor="text-red-400"
                  delay={300}
                />

                <StatCard 
                  label="Taxa de não conformidade" 
                  value={`${stats.nonComplianceRate.toFixed(2).replace('.', ',')}%`}
                  icon={AlertTriangle}
                  iconColor="text-orange-400"
                  delay={400}
                />
              </div>

              <button 
                onClick={handleReset}
                className="mt-6 flex items-center gap-2 text-neutral-500 hover:text-white transition-all px-6 py-2 rounded-full border border-transparent hover:border-white/10 hover:bg-white/5 font-medium text-xs uppercase tracking-widest"
              >
                <RotateCcw className="w-3 h-3" />
                Nova Auditoria
              </button>
            </div>
          )}

          {/* STATE: ERROR */}
          {appState === AppState.ERROR && (
            <div className="text-center max-w-xs p-6 bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 animate-scale-in z-30">
              <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-2">Falha na Conexão</h3>
              <p className="text-neutral-400 text-xs mb-5 leading-relaxed">
                Não foi possível conectar ao servidor. Verifique sua conexão.
              </p>
              <button
                onClick={handleReset}
                className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold hover:bg-neutral-200 transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          )}

        </main>

        {/* Footer */}
        <footer className="text-neutral-700 text-[10px] font-medium uppercase tracking-wider absolute bottom-4 w-full text-center z-10">
          © {new Date().getFullYear()} Teca Admin • v1.3
        </footer>
      </div>
    </div>
  );
};

export default App;