import { MapPin, LogOut, Percent, Flag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PointsChart } from '@/components/ui/PointsChart';
import { brl } from '@/utils';
import { META_ANUAL_PONTOS, ECOPONTOS } from '@/data';
import { useApp } from '@/context/AppContext';

export function DashboardScreen() {
  const {
    pontos,
    setPhotos,
    myDiscards,
    pendingPoints,
    discountValue,
    greetingName,
    monthlyHistory,
    navigate,
    handleLogout,
  } = useApp();
  return (
    <div className="up">
      <div className="bg-pri text-white px-5 pt-4 pb-14">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs opacity-80">Olá,</p>
            <p className="text-xl font-extrabold">{greetingName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-xs border border-white/60 rounded-full px-3 py-1.5"
            aria-label="Sair"
          >
            <LogOut size={14} />
            Sair
          </button>
        </div>
      </div>
      <div className="px-4 -mt-10">
        <section className="bg-white border rounded-lg p-4 shadow-sm">
          <p className="text-xs font-bold text-mut uppercase">
            Saldo acumulado na quadra · Q. 1005 Sul
          </p>
          <div className="flex items-end justify-between mt-1">
            <p className="text-4xl font-extrabold text-pri">
              {pontos}
              <span className="text-base font-bold text-mut"> pontos</span>
            </p>
            <div className="text-right">
              <p className="text-xs text-mut">Bônus IPTU</p>
              <p className="text-lg font-extrabold text-ok">{brl(discountValue)}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-mut mb-1">
              <span>Meta anual: {META_ANUAL_PONTOS} pts</span>
              <span>{Math.min(100, Math.round((pontos / META_ANUAL_PONTOS) * 100))}%</span>
            </div>
            <div className="h-2.5 bg-[#E0E0E0] rounded-full overflow-hidden">
              <div
                className="h-full bg-ok rounded-full transition-all duration-700"
                style={{ width: Math.min(100, (pontos / META_ANUAL_PONTOS) * 100) + '%' }}
              />
            </div>
          </div>
          {pendingPoints > 0 && (
            <p className="mt-3">
              <Badge tone="warn">{pendingPoints} pts aguardando homologação</Badge>
            </p>
          )}
        </section>
        <section className="mt-4 bg-white border rounded-lg p-4">
          <h2 className="font-bold text-sm mb-1">Evolução do bônus no IPTU</h2>
          <PointsChart values={[...monthlyHistory, pontos]} />
        </section>
        <div className="mt-4 space-y-2">
          <Button
            onClick={() => {
              setPhotos([null, null]);
              navigate('photoUpload');
            }}
          >
            <Trash2 size={18} />
            VALIDAR NOVO DESCARTE
          </Button>
          <Button variant="secondary" onClick={() => navigate('iptuExtrato')}>
            <Percent size={18} />
            MEUS BENEFÍCIOS
          </Button>
          <Button variant="secondary" onClick={() => navigate('reportProblem')}>
            <Flag size={18} />
            REPORTAR PROBLEMA
          </Button>
        </div>
        <section className="mt-5">
          <h2 className="font-bold text-sm mb-2">Ecopontos próximos</h2>
          {ECOPONTOS.map((e) => (
            <div
              key={e.c}
              className="bg-white border rounded-lg p-3 mb-2 flex items-center gap-3 text-sm"
            >
              <MapPin className="text-pri shrink-0" />
              <div className="flex-1">
                <p className="font-bold">{e.n}</p>
                <p className="text-xs text-mut">a {e.d} de você</p>
              </div>
              <Badge tone={e.s === 'Disponível' ? 'ok' : 'warn'}>{e.s}</Badge>
            </div>
          ))}
        </section>
        <section className="mt-4 mb-4">
          <h2 className="font-bold text-sm mb-2">Últimas atividades</h2>
          {myDiscards.slice(0, 3).map((d) => (
            <div key={d.id} className="flex justify-between items-center text-sm py-2 border-b">
              <div>
                <p className="font-semibold">Descarte {d.tipos.join(' + ')}</p>
                <p className="text-xs text-mut">{d.quando}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-ok">+{d.pts} pts</p>
                <Badge
                  tone={
                    d.status === 'Homologado' ? 'ok' : d.status === 'Rejeitado' ? 'err' : 'warn'
                  }
                >
                  {d.status}
                </Badge>
              </div>
            </div>
          ))}
        </section>
        <button
          onClick={() => navigate('adminPanel')}
          className="w-full text-xs text-mut underline mb-3"
        >
          Acesso restrito: Painel da Prefeitura
        </button>
      </div>
    </div>
  );
}
