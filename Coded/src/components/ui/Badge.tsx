import type { ReactNode } from 'react';

type BadgeTone = 'g' | 'ok' | 'err' | 'warn' | 'pri';

const TONE_CLASSES: Record<BadgeTone, string> = {
  g: 'bg-[#E8E8E8] text-ink',
  ok: 'bg-ok-l text-ok',
  err: 'bg-err-l text-err',
  warn: 'bg-warn-l text-[#6B5200]',
  pri: 'bg-pri-l text-pri',
};

export function Badge({ tone = 'g', children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
