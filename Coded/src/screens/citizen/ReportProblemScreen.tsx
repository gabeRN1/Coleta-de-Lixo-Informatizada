import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Badge } from '@/components/ui/Badge';
import { CheckboxCard } from '@/components/ui/CheckboxCard';
import { useApp } from '@/context/AppContext';

export function ReportProblemScreen() {
  const { currentUser, tickets, errors, isLoading, reportForm, setReportForm, handleSendAlert } =
    useApp();
  return (
    <div className="p-5 up">
      <TextField
        label="Código de identificação do contêiner"
        inputMode="numeric"
        maxLength={4}
        value={reportForm.cod}
        error={errors.cod}
        onChange={(e) => setReportForm({ ...reportForm, cod: e.target.value.replace(/\D/g, '') })}
        placeholder="Ex.: 7589"
      />
      <p className="text-sm font-bold mb-2">Categoria da avaria</p>
      {['Contêiner cheio', 'Estrutura danificada/vandalizada', 'Mau cheiro'].map((c) => (
        <CheckboxCard
          key={c}
          checked={reportForm.cats.includes(c)}
          onClick={() =>
            setReportForm({
              ...reportForm,
              cats: reportForm.cats.includes(c)
                ? reportForm.cats.filter((x) => x !== c)
                : [...reportForm.cats, c],
            })
          }
          label={c}
        />
      ))}
      {errors.cats && <p className="text-err text-xs mb-2">{errors.cats}</p>}
      <label className="block text-sm font-bold mt-3 mb-1">Observações ou sugestões</label>
      <textarea
        rows={4}
        maxLength={300}
        value={reportForm.obs}
        onChange={(e) => setReportForm({ ...reportForm, obs: e.target.value })}
        className="w-full border border-[#888] rounded-md p-3 text-sm focus:border-pri"
        placeholder="Descreva o que você viu no ecoponto..."
      />
      <p className="text-xs text-mut text-right mb-4">{reportForm.obs.length}/300</p>
      <Button onClick={handleSendAlert} loading={isLoading}>
        ENVIAR ALERTA
      </Button>
      {tickets.filter((t) => currentUser && t.cpf === currentUser.cpf).length > 0 && (
        <>
          <h2 className="font-bold text-sm mt-6 mb-2">Meus chamados</h2>
          {tickets
            .filter((t) => t.cpf === currentUser!.cpf)
            .map((t) => (
              <div key={t.id} className="border rounded-lg p-3 mb-2 text-sm bg-white">
                <div className="flex justify-between">
                  <b>{t.id}</b>
                  <Badge
                    tone={t.status === 'Resolvido' ? 'ok' : t.status === 'Aberto' ? 'err' : 'warn'}
                  >
                    {t.status}
                  </Badge>
                </div>
                <p className="text-xs text-mut">
                  Cód. {t.cod} · {t.cats.join(', ')}
                </p>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
