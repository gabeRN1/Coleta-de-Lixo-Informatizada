import { useApp } from '@/context/AppContext';

export function GovHeader() {
  const { fontSize, setFontSize, highContrast, setHighContrast } = useApp();
  const controls = [
    { label: 'A-', aria: 'Diminuir fonte', action: () => setFontSize(Math.max(13, fontSize - 1)) },
    { label: 'A+', aria: 'Aumentar fonte', action: () => setFontSize(Math.min(20, fontSize + 1)) },
    { label: '◐', aria: 'Alto contraste', action: () => setHighContrast(!highContrast) },
  ];
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white border-b text-xs">
      <div className="flex items-center gap-2">
        <span className="text-xl font-extrabold tracking-tight">
          <span className="text-pri">gov</span>
          <span className="text-[#E0A800]">.</span>
          <span className="text-ok">br</span>
        </span>
        <span className="text-mut border-l pl-2 leading-tight">
          Prefeitura de Palmas
          <br />
          Secretaria de Meio Ambiente
        </span>
      </div>
      <div className="flex gap-1">
        {controls.map((c) => (
          <button
            key={c.aria}
            onClick={c.action}
            aria-label={c.aria}
            className="w-8 h-8 rounded-full border border-pri text-pri font-bold hover:bg-pri-l"
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
