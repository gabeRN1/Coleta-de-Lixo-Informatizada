import { Badge } from '@/components/ui/Badge';
import { useApp } from '@/context/AppContext';

export function TicketsTab() {
  const { tickets, setTickets, notify } = useApp();
  return (
    <>
      {tickets.map((t) => (
        <div
          key={t.id}
          className="border rounded-lg p-4 mb-3 flex flex-wrap items-center gap-4 text-sm"
        >
          <div className="flex-1 min-w-[220px]">
            <p className="font-bold">
              {t.id} · Contêiner {t.cod}
            </p>
            <p className="text-mut">
              {t.nome} · {t.cats.join(', ')}
            </p>
            {t.obs && <p className="mt-1">{t.obs}</p>}
          </div>
          <Badge tone={t.status === 'Resolvido' ? 'ok' : t.status === 'Aberto' ? 'err' : 'warn'}>
            {t.status}
          </Badge>
          <select
            aria-label="Alterar status do chamado"
            value={t.status}
            onChange={(e) => {
              setTickets((x) =>
                x.map((y) => (y.id === t.id ? { ...y, status: e.target.value } : y)),
              );
              notify('Status de ' + t.id + ' atualizado em tempo real.');
            }}
            className="border border-[#888] rounded-md h-10 px-2 bg-white"
          >
            {['Aberto', 'Em triagem', 'Em atendimento', 'Resolvido'].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      ))}
    </>
  );
}
