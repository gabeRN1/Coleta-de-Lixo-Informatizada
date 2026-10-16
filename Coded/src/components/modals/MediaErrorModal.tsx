import { Camera } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { useApp } from '@/context/AppContext';

export function MediaErrorModal() {
  const { setActiveModal } = useApp();
  return (
    <Modal
      icon={Camera}
      title="Erro de Mídia"
      onClose={() => setActiveModal(null)}
      label="VOLTAR E TIRAR FOTOS"
    >
      Para continuar é obrigatório anexar <b>as duas fotos</b>: a do lixo e a da embalagem lacrada
      (arquivos de imagem).
    </Modal>
  );
}
