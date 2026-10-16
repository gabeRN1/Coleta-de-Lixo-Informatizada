import { ArrowLeft, Flag, Home, Percent, Trash2, type LucideIcon } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Screen } from '@/types';

interface NavItem {
  icon: LucideIcon;
  label: string;
  target: Screen;
}

export function BottomNav() {
  const { screen, navigate } = useApp();
  const isHome = screen === 'dashboard';
  const items: NavItem[] = [
    { icon: isHome ? Home : ArrowLeft, label: isHome ? 'Início' : 'Voltar', target: 'dashboard' },
    { icon: Trash2, label: 'Descartar', target: 'photoUpload' },
    { icon: Percent, label: 'Benefícios', target: 'iptuExtrato' },
    { icon: Flag, label: 'Reportar', target: 'reportProblem' },
  ];
  return (
    <nav className="bg-white border-t grid grid-cols-4" aria-label="Menu inferior">
      {items.map(({ icon: Icon, label, target }) => (
        <button
          key={label}
          onClick={() => navigate(target)}
          aria-current={screen === target ? 'page' : undefined}
          className={`py-2 flex flex-col items-center text-[11px] font-bold ${
            screen === target ? 'text-pri border-t-4 border-pri -mt-px' : 'text-mut'
          }`}
        >
          <Icon size={22} />
          {label}
        </button>
      ))}
    </nav>
  );
}
