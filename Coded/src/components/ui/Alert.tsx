import type { ReactNode } from 'react';
import { AlertTriangle, Check, Info, type LucideIcon } from 'lucide-react';
import type { Tone } from '@/types';

const TONES: Record<Tone, { classes: string; icon: LucideIcon }> = {
  info: { classes: 'bg-pri-l border-pri text-pri', icon: Info },
  ok: { classes: 'bg-ok-l border-ok text-ok', icon: Check },
  err: { classes: 'bg-err-l border-err text-err', icon: AlertTriangle },
  warn: { classes: 'bg-warn-l border-[#B58900] text-[#6B5200]', icon: AlertTriangle },
};

interface AlertProps {
  tone?: Tone;
  title?: string;
  children?: ReactNode;
}

export function Alert({ tone = 'info', title, children }: AlertProps) {
  const { classes, icon: Icon } = TONES[tone];
  return (
    <div role="alert" className={`flex gap-3 border-l-4 rounded p-3 mb-4 text-sm ${classes}`}>
      <Icon className="shrink-0 mt-0.5" />
      <div className="text-ink">
        {title && <p className="font-bold">{title}</p>}
        {children}
      </div>
    </div>
  );
}
