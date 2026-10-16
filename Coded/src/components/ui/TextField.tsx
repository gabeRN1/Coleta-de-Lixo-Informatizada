import type { InputHTMLAttributes, ReactNode } from 'react';
import { AlertTriangle, type LucideIcon } from 'lucide-react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  help?: string;
  icon?: LucideIcon;
  right?: ReactNode;
}

export function TextField({
  label,
  error,
  help,
  icon: Icon,
  right,
  ...inputProps
}: TextFieldProps) {
  const borderClasses = error
    ? 'border-2 border-err'
    : 'border-[#888] focus-within:border-pri focus-within:ring-2 focus-within:ring-pri/30';
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1">{label}</label>
      <div className={`flex items-center rounded-md bg-white border ${borderClasses}`}>
        {Icon && <Icon className="ml-3 text-mut" size={18} />}
        <input
          {...inputProps}
          className="flex-1 h-11 px-3 bg-transparent outline-none text-sm min-w-0"
        />
        {right}
      </div>
      {error ? (
        <p className="text-err text-xs mt-1 flex gap-1 items-center">
          <AlertTriangle size={14} />
          {error}
        </p>
      ) : (
        help && <p className="text-xs text-mut mt-1">{help}</p>
      )}
    </div>
  );
}
