import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'success' | 'link';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-pri text-white hover:bg-pri-d',
  secondary: 'bg-white text-pri border-2 border-pri hover:bg-pri-l',
  danger: 'bg-err text-white hover:opacity-90',
  success: 'bg-ok text-white hover:opacity-90',
  link: 'text-pri underline font-semibold',
};

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  loading,
  disabled,
  className = '',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full min-h-[44px] px-6 rounded-full font-bold text-sm tracking-wide transition disabled:opacity-50 flex items-center justify-center gap-2 ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
