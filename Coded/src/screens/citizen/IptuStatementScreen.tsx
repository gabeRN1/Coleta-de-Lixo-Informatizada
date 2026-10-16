import { Printer, Home, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { brl } from '@/utils';
import { IPTU_ESTIMADO, REAIS_POR_PONTO } from '@/data';
import { useApp } from '@/context/AppContext';

export function IptuStatementScreen() {
  const {
    pontos,
    setActiveModal,
    myDiscards,
    pendingPoints,
    discountValue,
    discountPercent,
    userName,
  } = useApp();
  return (
    <div className="p-5 up">
      <section className="bg-white border rounded-lg p-4 mb-4">
        <h2 className="font-bold text-sm mb-2 flex items-center gap-2">
          <Home size={16} className="text-pri" />
          Imóvel vinculado
        </h2>
        <dl className="text-sm space-y-1">
          <div>
            <dt className="text-xs text-mut">Contribuinte</dt>
            <dd className="font-semibold">{userName}</dd>
          </div>
          <div>
            <dt className="text-xs text-mut">Endereço</dt>
            <dd className="font-semibold">Quadra 1005 Sul, Alameda 2, Lote 12 - Palmas/TO</dd>
          </div>
          <div>
            <dt className="text-xs text-mut">Inscrição imobiliária</dt>
            <dd className="font-semibold">1.05.1005.0012.000</dd>
          </div>
        </dl>
      </section>
      <section className="bg-white border rounded-lg overflow-hidden mb-4">
        <div className="bg-pri text-white px-4 py-2 text-sm font-bold">Demonstrativo IPTU 2026</div>
        <div className="p-4 text-sm space-y-3">
          <div className="flex justify-between">
            <span>Valor original estimado</span>
            <b>{brl(IPTU_ESTIMADO)}</b>
          </div>
          <div className="flex justify-between text-ok">
            <span>Desconto acumulado ({discountPercent.toFixed(2).replace('.', ',')}%)</span>
            <b>- {brl(discountValue)}</b>
          </div>
          <div className="flex justify-between border-t pt-3 text-base">
            <b>Valor líquido a pagar</b>
            <b className="text-pri">{brl(IPTU_ESTIMADO - discountValue)}</b>
          </div>
        </div>
      </section>
      <p className="text-xs text-mut mb-4 flex gap-1">
        <Info size={14} className="shrink-0" />
        {pontos} pontos × {brl(REAIS_POR_PONTO)} por ponto.{' '}
        {pendingPoints > 0
          ? pendingPoints + ' pts ainda aguardam homologação da Prefeitura.'
          : 'Todos os créditos estão homologados.'}
      </p>
      <h2 className="font-bold text-sm mb-1">Histórico de descartes</h2>
      {myDiscards.map((d) => (
        <div key={d.id} className="flex justify-between text-sm py-2 border-b">
          <div>
            <p className="font-semibold">{d.tipos.join(' + ')}</p>
            <p className="text-xs text-mut">
              {d.quando} · cód. {d.eco}
            </p>
          </div>
          <div className="text-right">
            <b>+{d.pts}</b>
            <br />
            <Badge
              tone={d.status === 'Homologado' ? 'ok' : d.status === 'Rejeitado' ? 'err' : 'warn'}
            >
              {d.status}
            </Badge>
          </div>
        </div>
      ))}
      <div className="mt-5">
        <Button onClick={() => setActiveModal('decl')}>
          <Printer size={18} />
          EMITIR DECLARAÇÃO
        </Button>
      </div>
    </div>
  );
}
