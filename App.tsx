
import React, { useState, useCallback } from 'react';
import { Play, CheckCircle2, AlertCircle, RotateCcw, UserCheck, Users, UserX, AlertTriangle } from 'lucide-react';
import { AppState, AuditStats } from './types';
import { triggerAudit } from './services/auditService';
import { StatCard } from './components/StatCard';
import { LoadingView } from './components/LoadingView';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [stats, setStats] = useState<AuditStats | null>(null);

  const handleStartAudit = useCallback(async () => {
    setAppState(AppState.LOADING);
    
    // A lógica de espera (15s) agora está DENTRO do triggerAudit
    // para garantir que só buscaremos os dados DEPOIS desse tempo.
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      
      {/* Header - Only visible when NOT in success state */}
      {appState !== AppState.SUCCESS && (
        <header className="mb-12 text-center space-y-2 animate-scale-in">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sistema de auditoria de raio-x
          </h2>
          {appState === AppState.IDLE && (
            <p className="text-slate-500 text-lg">Toque abaixo para iniciar o processo de verificação.</p>
          )}
        </header>
      )}

      {/* Main Content Area */}
      <main className="w-full max-w-3xl flex flex-col items-center justify-center flex-grow transition-all duration-500">
        
        {/* STATE: IDLE */}
        {appState === AppState.IDLE && (
          <div className="mt-8 animate-scale-in">
            <button
              onClick={handleStartAudit}
              className="group relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex flex-col items-center justify-center transition-all duration-300 shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-200"
            >
              <div className="absolute inset-0 rounded-full border-4 border-white/20 scale-95 group-hover:scale-100 transition-transform duration-500"></div>
              <Play className="w-16 h-16 sm:w-20 sm:h-20 mb-4 fill-current ml-2" />
              <span className="text-xl sm:text-2xl font-bold tracking-wide">Iniciar auditoria</span>
            </button>
          </div>
        )}

        {/* STATE: LOADING */}
        {appState === AppState.LOADING && (
          <LoadingView />
        )}

        {/* STATE: SUCCESS */}
        {appState === AppState.SUCCESS && stats && (
          <div className="w-full flex flex-col items-center space-y-8 animate-scale-in pt-6">
            
            <div className="text-center space-y-2 mb-2">
              <h2 className="text-3xl font-bold text-emerald-600 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-9 h-9" />
                Auditoria concluída
              </h2>
            </div>

            <div className="w-full max-w-md flex flex-col gap-4">
              
              {/* Card 1: Presenças Auditadas (Teal) */}
              <StatCard 
                label="Presenças auditadas" 
                value={stats.total} 
                className="bg-emerald-50 text-emerald-900 shadow-emerald-100/50 border border-emerald-100"
                iconColor="text-emerald-600"
                icon={Users}
                delay={100}
              />
              
              {/* Card 2: Presenças Validadas (Violet) */}
              <StatCard 
                label="Presenças validadas" 
                value={stats.validated} 
                className="bg-[#A78BFA] text-white shadow-violet-200" 
                icon={UserCheck}
                delay={200}
              />
              
              {/* Card 3: Presenças NÃO validadas (Red) */}
              <StatCard 
                label="Presenças NÃO validadas" 
                value={stats.invalid} 
                className="bg-[#F87171] text-white shadow-red-200" 
                icon={UserX}
                delay={300}
              />

              {/* Card 4: Percentual de Não Conformidade (Orange) */}
              <StatCard 
                label="Percentual de não conformidade" 
                value={`${stats.nonComplianceRate.toFixed(2).replace('.', ',')}%`}
                className="bg-orange-400 text-white shadow-orange-200" 
                icon={AlertTriangle}
                delay={400}
              />
            </div>

            <button 
              onClick={handleReset}
              className="mt-6 flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-colors px-6 py-3 rounded-full hover:bg-emerald-50 font-medium"
            >
              <RotateCcw className="w-5 h-5" />
              Nova Auditoria
            </button>
          </div>
        )}

        {/* STATE: ERROR */}
        {appState === AppState.ERROR && (
          <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl border border-red-100 animate-scale-in">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Erro na Auditoria</h3>
            <p className="text-slate-500 mb-6">Não foi possível conectar ao servidor de auditoria. Verifique sua conexão e tente novamente.</p>
            <button
              onClick={handleReset}
              className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
            >
              Tentar Novamente
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-12 text-slate-400 text-sm font-medium">
        © {new Date().getFullYear()} Teca Admin • Sistema v1.0
      </footer>
    </div>
  );
};

export default App;
