import { Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { PhotoThumb } from '@/components/ui/PhotoThumb';
import { useApp } from '@/context/AppContext';

export function DiscardsTab() {
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    setPendingAction,
    setLightboxPhoto,
    filteredDiscards,
    approveDiscard,
  } = useApp();
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center border border-[#888] rounded-md px-3 flex-1 min-w-[200px]">
          <Search size={16} className="text-mut" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome ou CPF"
            className="h-10 px-2 flex-1 outline-none text-sm"
            aria-label="Buscar por nome ou CPF"
          />
        </div>
        {['Todos', 'Pendente', 'Homologado', 'Rejeitado'].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={
              'px-4 rounded-full text-sm font-bold border ' +
              (statusFilter === s ? 'bg-pri text-white border-pri' : 'border-pri text-pri')
            }
          >
            {s}
          </button>
        ))}
      </div>
      {filteredDiscards.length === 0 && (
        <p className="text-center text-mut py-8">Nenhum descarte encontrado.</p>
      )}
      {filteredDiscards.map((d) => (
        <div
          key={d.id}
          className="border rounded-lg p-4 mb-3 grid md:grid-cols-[1.3fr_auto_1fr_auto] gap-4 items-center"
        >
          <div className="text-sm">
            <p className="font-bold">{d.nome}</p>
            <p className="text-mut">CPF {d.cpf}</p>
            <p className="text-xs text-mut">
              {d.id} · Ecoponto cód. {d.eco} · {d.quando}
            </p>
            <div className="mt-1 flex gap-1 flex-wrap">
              {d.tipos.map((t) => (
                <Badge key={t} tone="pri">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {['Lixo', 'Embalagem lacrada'].map((l, i) => (
              <button
                key={l}
                onClick={() => setLightboxPhoto({ f: d.fotos && d.fotos[i], i, l })}
                className="text-center"
                aria-label={'Ampliar foto: ' + l}
              >
                <PhotoThumb
                  photo={d.fotos && d.fotos[i]}
                  index={i}
                  className="w-20 h-20 rounded-md border"
                />
                <span className="text-[11px] text-mut">{l}</span>
              </button>
            ))}
          </div>
          <div>
            {d.flag && <Alert tone="warn">{d.flag}</Alert>}
            <Badge
              tone={d.status === 'Homologado' ? 'ok' : d.status === 'Rejeitado' ? 'err' : 'warn'}
            >
              {d.status}
            </Badge>{' '}
            <span className="text-sm font-bold">{d.pts} pts</span>
            {d.motivo && <p className="text-xs text-mut mt-1">Motivo: {d.motivo}</p>}
          </div>
          <div className="flex md:flex-col gap-2 min-w-[190px]">
            {d.status === 'Pendente' ? (
              <>
                <Button variant="success" onClick={() => approveDiscard(d.id)}>
                  HOMOLOGAR CRÉDITOS
                </Button>
                <Button variant="danger" onClick={() => setPendingAction({ k: 'rej', id: d.id })}>
                  REJEITAR / NOTIFICAR FRAUDE
                </Button>
              </>
            ) : (
              <span className="text-xs text-mut">Auditoria concluída</span>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
