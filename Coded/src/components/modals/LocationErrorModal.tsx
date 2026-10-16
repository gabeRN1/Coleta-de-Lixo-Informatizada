import { AlertTriangle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { useApp } from '@/context/AppContext';

export function LocationErrorModal() {
  const { setGpsReading, setActiveModal } = useApp();
  return (
    <Modal
      icon={AlertTriangle}
      title="Erro de Localização"
      onClose={() => {
        setActiveModal(null);
        setGpsReading(null);
      }}
      label="TENTAR NOVAMENTE"
    >
      O sinal de GPS indica que você está fora do perímetro de 15 metros permitido para este
      ecoponto.
    </Modal>
  );
}
