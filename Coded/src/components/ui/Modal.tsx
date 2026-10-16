import type { ReactNode } from 'react';
import { AlertTriangle, type LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  icon?: LucideIcon;
  tone?: 'error' | 'primary';
  title: string;
  onClose: () => void;
  label?: string;
  wide?: boolean;
  children?: ReactNode;
}

export function Modal({
  icon: Icon = AlertTriangle,
  tone = 'error',
  title,
  onClose,
  label,
  wide,
  children,
}: ModalProps) {
  const isError = tone === 'error';
  return (
    <div
      className="absolute inset-0 z-50 bg-nav/70 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`up bg-white rounded-lg w-full shadow-2xl overflow-hidden ${wide ? 'max-w-2xl' : ''}`}
      >
        <div
          className={`px-4 py-3 flex items-center gap-2 text-white font-bold ${isError ? 'bg-err' : 'bg-pri'}`}
        >
          <Icon />
          {title}
        </div>
        <div className="p-4 text-sm">{children}</div>
        {label && (
          <div className="p-4 pt-0">
            <Button onClick={onClose} variant={isError ? 'danger' : 'primary'}>
              {label}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
