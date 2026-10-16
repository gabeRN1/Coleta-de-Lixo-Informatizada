import { useApp } from '@/context/AppContext';
import { SCREEN_LABELS } from '@/data';

export function AppToolbar() {
  const { screen, currentUser, navigate } = useApp();
  const isAdmin = screen === 'adminPanel';
  return (
    <div className="max-w-6xl mx-auto mb-3 flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => navigate(currentUser ? 'dashboard' : 'login')}
        className={`px-5 py-2 rounded-full text-sm font-bold ${
          isAdmin ? 'bg-white text-pri border border-pri' : 'bg-pri text-white'
        }`}
      >
        App do Cidadão
      </button>
      <button
        onClick={() => navigate('adminPanel')}
        className={`px-5 py-2 rounded-full text-sm font-bold ${
          isAdmin ? 'bg-nav text-white' : 'bg-white text-nav border border-nav'
        }`}
      >
        Painel da Prefeitura
      </button>
      <span className="text-xs font-bold bg-white border rounded-full px-3 py-1.5 text-mut">
        {SCREEN_LABELS[screen]}
      </span>
    </div>
  );
}
