import { KpiCards } from './KpiCards';
import { AdminTabs } from './AdminTabs';
import { DiscardsTab } from './DiscardsTab';
import { TicketsTab } from './TicketsTab';
import { UsersTab } from './UsersTab';
import { AdminModals } from './AdminModals';
import { GovHeader } from '@/components/ui/GovHeader';
import { useApp } from '@/context/AppContext';

export function AdminPanel() {
  const { currentUser, activeTab, navigate } = useApp();
  return (
    <div className="relative max-w-6xl mx-auto bg-white rounded-lg shadow border overflow-hidden up">
      <GovHeader />
      <div className="bg-pri text-white px-6 py-4 flex flex-wrap justify-between gap-2">
        <div>
          <p className="text-xs opacity-80">Início › Meio Ambiente › Palmas Recicla +</p>
          <h1 className="text-xl font-extrabold">Painel da Prefeitura Municipal</h1>
        </div>
        <div className="text-sm text-right">
          <p className="font-bold">Carla Mendes · Eng.ª Ambiental</p>
          <button
            className="underline text-xs"
            onClick={() => navigate(currentUser ? 'dashboard' : 'login')}
          >
            Voltar ao aplicativo
          </button>
        </div>
      </div>
      <div className="p-6">
        <KpiCards />
        <AdminTabs />
        {activeTab === 'desc' && <DiscardsTab />}
        {activeTab === 'tk' && <TicketsTab />}
        {activeTab === 'us' && <UsersTab />}
      </div>
      <AdminModals />
    </div>
  );
}
