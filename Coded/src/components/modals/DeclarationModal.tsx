import { FileText, Printer } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { brl, formatNow } from '@/utils';
import { IPTU_ESTIMADO } from '@/data';
import { useApp } from '@/context/AppContext';

export function DeclarationModal() {
  const { currentUser, pontos, setActiveModal, discountValue, discountPercent, userName, notify } =
    useApp();
  return (
    <Modal
      icon={FileText}
      tone="primary"
      title="Declaração de Bônus Sustentável"
      onClose={() => setActiveModal(null)}
    >
      <div id="decl" className="border rounded p-4 text-xs leading-relaxed bg-white">
        <p className="text-center font-extrabold text-sm">PREFEITURA MUNICIPAL DE PALMAS - TO</p>
        <p className="text-center mb-3">Secretaria de Meio Ambiente · Programa Palmas Recicla +</p>
        <p>
          Declaramos que <b>{userName}</b>, CPF <b>{currentUser && currentUser.cpf}</b>,
          proprietário(a) do imóvel situado na <b>Quadra 1005 Sul, Alameda 2, Lote 12</b>, acumulou{' '}
          <b>{pontos} pontos</b> por descartes conscientes, convertidos em desconto de{' '}
          <b>{brl(discountValue)}</b> ({discountPercent.toFixed(2).replace('.', ',')}%) sobre o IPTU
          2026.
        </p>
        <p className="mt-2">
          Valor original: {brl(IPTU_ESTIMADO)} · Valor líquido:{' '}
          <b>{brl(IPTU_ESTIMADO - discountValue)}</b>
        </p>
        <p className="mt-3 text-mut">
          Emitida em {formatNow()} · Código de verificação: PR-
          {(currentUser ? currentUser.cpf : '').replace(/\D/g, '').slice(0, 6)}-{pontos}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button variant="secondary" onClick={() => setActiveModal(null)}>
          FECHAR
        </Button>
        <Button
          onClick={() => {
            try {
              window.print();
            } catch (e) {}
            notify('Declaração enviada para impressão / PDF.');
          }}
        >
          <Printer size={16} />
          IMPRIMIR
        </Button>
      </div>
    </Modal>
  );
}
