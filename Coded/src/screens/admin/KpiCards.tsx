import { Check, FileText, Flag, Users, type LucideIcon } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function KpiCards() {
  const { users, discards, tickets } = useApp();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {(
        [
          [
            'Descartes a auditar',
            discards.filter((d) => d.status === 'Pendente').length,
            FileText,
            'text-pri',
          ],
          [
            'Pontos a homologar',
            discards.filter((d) => d.status === 'Pendente').reduce((a, d) => a + d.pts, 0),
            Check,
            'text-ok',
          ],
          [
            'Chamados em aberto',
            tickets.filter((t) => t.status !== 'Resolvido').length,
            Flag,
            'text-err',
          ],
          [
            'Advertidos / banidos',
            users.filter((u) => u.adv > 0 || u.ban).length,
            Users,
            'text-[#B58900]',
          ],
        ] as [string, number, LucideIcon, string][]
      ).map(([l, v, I, c]) => (
        <div key={l} className="border rounded-lg p-4 flex items-center gap-3">
          <I size={28} className={c} />
          <div>
            <p className={'text-2xl font-extrabold ' + c}>{v}</p>
            <p className="text-xs text-mut">{l}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
