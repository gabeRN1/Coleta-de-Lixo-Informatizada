import { DeclarationModal } from '@/components/modals/DeclarationModal';
import { InvalidCodeModal } from '@/components/modals/InvalidCodeModal';
import { LocationErrorModal } from '@/components/modals/LocationErrorModal';
import { MediaErrorModal } from '@/components/modals/MediaErrorModal';
import { useApp } from '@/context/AppContext';

export function ModalsHost() {
  const { activeModal } = useApp();
  return (
    <>
      {activeModal === '4c' && <MediaErrorModal />}
      {activeModal === '5a' && <LocationErrorModal />}
      {activeModal === '5b' && <InvalidCodeModal />}
      {activeModal === 'decl' && <DeclarationModal />}
    </>
  );
}
