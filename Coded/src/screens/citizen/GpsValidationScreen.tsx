import { MapPin, AlertTriangle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { useApp } from '@/context/AppContext';

export function GpsValidationScreen() {
  const {
    releaseCode,
    secondsLeft,
    gpsReading,
    setGpsReading,
    simulatedDistance,
    setSimulatedDistance,
    containerCode,
    setContainerCode,
    errors,
    handleGetLocation,
    handleValidateLocation,
  } = useApp();
  const distance = gpsReading && gpsReading !== 'load' ? gpsReading.d : simulatedDistance;
  return (
    <div className="p-5 up">
      <div className="bg-pri-l border border-pri rounded-lg p-3 text-center mb-4">
        <p className="text-xs text-pri font-bold">CÓDIGO DE LIBERAÇÃO DO DESCARTE</p>
        <p className="text-3xl font-extrabold tracking-[.25em] text-nav">
          {releaseCode.slice(0, 3)} {releaseCode.slice(3)}
        </p>
        <p className="text-xs text-mut flex items-center justify-center gap-1">
          <Clock size={12} />
          Válido por {String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:
          {String(secondsLeft % 60).padStart(2, '0')}
        </p>
      </div>
      <h2 className="font-bold text-sm mb-2">1. Confirme que você está no ecoponto</h2>
      <div className="border rounded-lg p-3 mb-2 bg-white">
        <div className="flex gap-3 items-center">
          <svg viewBox="0 0 200 200" className="w-28 h-28 shrink-0">
            <rect width="200" height="200" rx="8" fill="#F3F6FB" />
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="#168821"
              fillOpacity=".12"
              stroke="#168821"
              strokeDasharray="5 4"
              strokeWidth="2"
            />
            <circle cx="100" cy="100" r="6" fill="#071D41" />
            {gpsReading && gpsReading !== 'load' && (
              <circle
                cx={100 + Math.min(distance * 4, 90)}
                cy="100"
                r="7"
                fill={distance > 15 ? '#E52207' : '#1351B4'}
                stroke="#fff"
                strokeWidth="2"
              />
            )}
            <text x="100" y="180" fontSize="13" textAnchor="middle" fill="#636363">
              raio 15 m
            </text>
          </svg>
          <div className="text-sm flex-1">
            {gpsReading === 'load' ? (
              <p className="flex items-center gap-2 text-pri font-bold">
                <span className="w-4 h-4 border-2 border-pri/30 border-t-pri rounded-full animate-spin" />
                Obtendo localização...
              </p>
            ) : gpsReading ? (
              <>
                <p className={'font-bold ' + (gpsReading.d > 15 ? 'text-err' : 'text-ok')}>
                  {gpsReading.d > 15 ? 'Fora do perímetro' : 'Dentro do perímetro'}
                </p>
                <p>
                  Distância: <b>{gpsReading.d} m</b>
                </p>
                <p className="text-xs text-mut">
                  {gpsReading.lat}, {gpsReading.lng}
                  <br />
                  Obtida em {gpsReading.s} s (limite 3 s)
                </p>
              </>
            ) : (
              <p className="text-mut text-xs">
                Toque no botão para capturar as coordenadas do GPS do seu celular.
              </p>
            )}
          </div>
        </div>
        <div className="mt-3 text-xs">
          <p className="text-mut mb-1">Simulação de distância (demonstração):</p>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                [8, 'A 8 m do ecoponto'],
                [42, 'A 42 m do ecoponto'],
              ] as [number, string][]
            ).map(([v, l]) => (
              <button
                key={v}
                onClick={() => {
                  setSimulatedDistance(v);
                  setGpsReading(null);
                }}
                className={
                  'py-2 rounded-full border font-bold ' +
                  (simulatedDistance === v ? 'bg-pri text-white border-pri' : 'border-pri text-pri')
                }
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3">
          <Button variant="secondary" onClick={handleGetLocation} disabled={gpsReading === 'load'}>
            <MapPin size={16} />
            {gpsReading && gpsReading !== 'load'
              ? 'Atualizar localização'
              : 'Obter minha localização'}
          </Button>
        </div>
        {errors.gps && (
          <p className="text-err text-xs mt-2 flex gap-1">
            <AlertTriangle size={14} />
            {errors.gps}
          </p>
        )}
      </div>
      <h2 className="font-bold text-sm mb-2">2. Código do contêiner</h2>
      <TextField
        label="Código numérico impresso no contêiner"
        inputMode="numeric"
        maxLength={4}
        value={containerCode}
        error={errors.cod}
        help="São 4 números na placa do contêiner (ex.: 7589)."
        onChange={(e) => setContainerCode(e.target.value.replace(/\D/g, ''))}
        placeholder="0000"
      />
      <Button onClick={handleValidateLocation}>VALIDAR LOCAL E DEPOSITAR</Button>
    </div>
  );
}
