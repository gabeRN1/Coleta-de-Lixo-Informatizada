import { Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { CheckboxCard } from '@/components/ui/CheckboxCard';
import { useApp } from '@/context/AppContext';

export function PostDischargeScreen() {
  const {
    wasteTypes,
    setWasteTypes,
    recyclableSubtypes,
    setRecyclableSubtypes,
    rating,
    setRating,
    errors,
    toggleItem,
    handleCompleteDiscard,
  } = useApp();
  return (
    <div className="p-5 up">
      <Alert tone="ok" title="Local validado!">
        Depósito confirmado no Ecoponto 7589 - Q. 104 Sul. Preencha a declaração de resíduos.
      </Alert>
      <h2 className="font-bold text-sm mb-2">Tipo de resíduo depositado</h2>
      <CheckboxCard
        checked={wasteTypes.includes('Reciclável')}
        onClick={() => toggleItem(wasteTypes, setWasteTypes, 'Reciclável')}
        label="Reciclável"
        description="+50 pontos"
      />
      {wasteTypes.includes('Reciclável') && (
        <div className="flex flex-wrap gap-2 mb-3 ml-2">
          {['Papel', 'Plástico', 'Vidro', 'Metal'].map((m) => (
            <button
              key={m}
              onClick={() => toggleItem(recyclableSubtypes, setRecyclableSubtypes, m)}
              className={
                'px-3 py-1 rounded-full text-xs font-bold border ' +
                (recyclableSubtypes.includes(m)
                  ? 'bg-pri text-white border-pri'
                  : 'border-pri text-pri')
              }
            >
              {m}
            </button>
          ))}
        </div>
      )}
      <CheckboxCard
        checked={wasteTypes.includes('Orgânico')}
        onClick={() => toggleItem(wasteTypes, setWasteTypes, 'Orgânico')}
        label="Orgânico"
        description="+20 pontos"
      />
      {errors.tipos && <p className="text-err text-xs mb-2">{errors.tipos}</p>}
      <h2 className="font-bold text-sm mt-4 mb-1">Como estava a limpeza do contêiner?</h2>
      <div className="flex gap-1" role="radiogroup">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            role="radio"
            aria-checked={rating === n}
            aria-label={n + ' estrelas'}
            onClick={() => setRating(n)}
            className={n <= rating ? 'text-[#F5B400]' : 'text-[#CCC]'}
          >
            <Star size={38} fill="currentColor" />
          </button>
        ))}
      </div>
      <p className="text-xs text-mut h-4 mb-1">
        {['', 'Muito sujo', 'Sujo', 'Regular', 'Limpo', 'Muito limpo'][rating]}
      </p>
      {errors.nota && <p className="text-err text-xs mb-2">{errors.nota}</p>}
      <div className="bg-[#F8F8F8] border rounded-lg p-3 my-4 text-sm flex justify-between">
        <span>Você vai receber</span>
        <b className="text-ok">
          +
          {(wasteTypes.includes('Reciclável') ? 50 : 0) +
            (wasteTypes.includes('Orgânico') ? 20 : 0)}{' '}
          pontos
        </b>
      </div>
      <Button onClick={handleCompleteDiscard}>ENVIAR E CONCLUIR</Button>
    </div>
  );
}
