import { useApp } from '@/context/AppContext';

export function AdminTabs() {
  const { activeTab, setActiveTab } = useApp();
  return (
    <div className="flex gap-1 border-b mb-4 overflow-x-auto" role="tablist">
      {[
        ['desc', 'Auditoria de Descartes (UC07)'],
        ['tk', 'Chamados (RF09)'],
        ['us', 'Moderação de Usuários (RF10)'],
      ].map(([k, l]) => (
        <button
          key={k}
          role="tab"
          aria-selected={activeTab === k}
          onClick={() => setActiveTab(k)}
          className={
            'px-4 py-2.5 text-sm font-bold whitespace-nowrap border-b-4 ' +
            (activeTab === k ? 'border-pri text-pri' : 'border-transparent text-mut')
          }
        >
          {l}
        </button>
      ))}
    </div>
  );
}
