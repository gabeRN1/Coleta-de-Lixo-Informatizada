import { Camera, AlertTriangle, Ban } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { PhotoThumb } from '@/components/ui/PhotoThumb';
import { useApp } from '@/context/AppContext';

export function AdminModals() {
  const {
    pendingAction,
    setPendingAction,
    rejectionReason,
    setRejectionReason,
    lightboxPhoto,
    setLightboxPhoto,
    rejectDiscard,
    moderateUser,
  } = useApp();
  return (
    <>
      {pendingAction && pendingAction.k === 'rej' && (
        <Modal
          icon={AlertTriangle}
          title="Rejeitar / Notificar Fraude"
          onClose={() => setPendingAction(null)}
        >
          <p className="mb-3">
            O cidadão será notificado, os pontos serão estornados e será registrada uma advertência.
          </p>
          <label className="text-sm font-bold">Motivo</label>
          <select
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="w-full border border-[#888] rounded-md h-11 px-2 mt-1 mb-4 bg-white"
          >
            {[
              'Imagem falsa ou manipulada',
              'Foto repetida de descarte anterior',
              'Material diferente do declarado',
            ].map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" onClick={() => setPendingAction(null)}>
              CANCELAR
            </Button>
            <Button variant="danger" onClick={() => rejectDiscard(pendingAction.id!)}>
              CONFIRMAR
            </Button>
          </div>
        </Modal>
      )}
      {pendingAction && pendingAction.k !== 'rej' && (
        <Modal
          icon={Ban}
          title={pendingAction.k === 'ban' ? 'Banir usuário' : 'Advertir usuário'}
          onClose={() => setPendingAction(null)}
        >
          <p className="mb-4">
            {pendingAction.k === 'ban'
              ? 'O cidadão perderá o acesso ao aplicativo e não poderá registrar novos descartes.'
              : 'Será registrada uma advertência formal no cadastro do cidadão.'}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" onClick={() => setPendingAction(null)}>
              CANCELAR
            </Button>
            <Button
              variant="danger"
              onClick={() => moderateUser(pendingAction.k, pendingAction.cpf!)}
            >
              CONFIRMAR
            </Button>
          </div>
        </Modal>
      )}
      {lightboxPhoto && (
        <Modal
          icon={Camera}
          tone="primary"
          title={'Foto: ' + lightboxPhoto.l}
          onClose={() => setLightboxPhoto(null)}
          label="FECHAR"
        >
          <PhotoThumb
            photo={lightboxPhoto.f}
            index={lightboxPhoto.i}
            className="w-full aspect-square max-h-[60vh] rounded-md mb-4"
          />
        </Modal>
      )}
    </>
  );
}
