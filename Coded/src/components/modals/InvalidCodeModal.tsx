import { AlertTriangle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { useApp } from '@/context/AppContext';

export function InvalidCodeModal() {
  const { setContainerCode, setActiveModal } = useApp();
  return (
    <Modal
      icon={AlertTriangle}
      title="Código Inválido"
      onClose={() => {
        setActiveModal(null);
        setContainerCode('');
      }}
      label="CORRIGIR CÓDIGO"
    >
      O número digitado não corresponde a nenhum contêiner ativo nesta quadra.
    </Modal>
  );
}
