import { Check } from 'lucide-react';

interface CheckboxCardProps {
  checked: boolean;
  onClick: () => void;
  label: string;
  description?: string;
}

export function CheckboxCard({ checked, onClick, label, description }: CheckboxCardProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onClick}
      className={`w-full flex items-center gap-3 text-left border rounded-lg p-3 mb-2 text-sm ${
        checked ? 'border-pri bg-pri-l' : 'border-[#CCC] bg-white'
      }`}
    >
      <span
        className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
          checked ? 'bg-pri border-pri text-white' : 'border-[#888]'
        }`}
      >
        {checked && <Check size={14} />}
      </span>
      <span>
        <b>{label}</b>
        {description && <span className="block text-xs text-mut">{description}</span>}
      </span>
    </button>
  );
}
