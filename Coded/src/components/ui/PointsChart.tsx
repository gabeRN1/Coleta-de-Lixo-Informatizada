import { REAIS_POR_PONTO } from '@/data';

const MONTHS = ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'];

export function PointsChart({ values }: { values: number[] }) {
  const max = Math.max(1, ...values);
  return (
    <svg
      viewBox="0 0 300 130"
      className="w-full"
      role="img"
      aria-label="Gráfico de evolução do bônus acumulado"
    >
      {values.map((value, i) => {
        const height = (value / max) * 80;
        const reais = Math.round(value * REAIS_POR_PONTO);
        return (
          <g key={MONTHS[i]}>
            <rect
              x={14 + i * 47}
              y={100 - height}
              width="32"
              height={height}
              rx="3"
              fill={i === 5 ? '#1351B4' : '#9DB9E3'}
            />
            <text
              x={30 + i * 47}
              y={94 - height}
              fontSize="10"
              textAnchor="middle"
              fill="#333"
              fontWeight="700"
            >
              {reais > 0 ? `R$${reais}` : ''}
            </text>
            <text x={30 + i * 47} y="116" fontSize="10" textAnchor="middle" fill="#636363">
              {MONTHS[i]}
            </text>
          </g>
        );
      })}
      <line x1="8" x2="292" y1="100" y2="100" stroke="#CCC" />
    </svg>
  );
}
