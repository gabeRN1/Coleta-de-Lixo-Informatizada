import { Fragment } from 'react';
import { Check } from 'lucide-react';

const STEPS = ['Fotos', 'Validação', 'Formulário'];

export function Stepper({ current }: { current: number }) {
  return (
    <div
      className="flex items-center px-5 py-3 bg-white border-b"
      aria-label={`Etapa ${current} de ${STEPS.length}`}
    >
      {STEPS.map((label, i) => {
        const done = current > i + 1;
        const active = current === i + 1;
        return (
          <Fragment key={label}>
            {i > 0 && (
              <div className={`flex-1 h-0.5 mx-2 ${current > i ? 'bg-pri' : 'bg-[#CCC]'}`} />
            )}
            <div className="flex flex-col items-center">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  done ? 'bg-ok text-white' : active ? 'bg-pri text-white' : 'bg-[#E8E8E8] text-mut'
                }`}
              >
                {done ? <Check size={14} /> : i + 1}
              </span>
              <span className="text-[11px] mt-0.5 font-semibold">{label}</span>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
