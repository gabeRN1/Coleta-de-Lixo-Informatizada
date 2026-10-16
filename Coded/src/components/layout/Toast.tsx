import { AlertTriangle, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function Toast() {
  const { toast } = useApp();
  return toast ? (
    <div
      role="status"
      className={
        'up absolute top-14 inset-x-3 z-50 rounded-lg shadow-lg px-4 py-3 text-sm font-semibold flex gap-2 items-start text-white ' +
        (toast.t === 'err'
          ? 'bg-err'
          : toast.t === 'warn'
            ? 'bg-[#8A6D00]'
            : toast.t === 'info'
              ? 'bg-pri'
              : 'bg-ok')
      }
    >
      {toast.t === 'err' ? (
        <AlertTriangle size={18} className="shrink-0 mt-0.5" />
      ) : (
        <Check size={18} className="shrink-0 mt-0.5" />
      )}
      {toast.m}
    </div>
  ) : null;
}
