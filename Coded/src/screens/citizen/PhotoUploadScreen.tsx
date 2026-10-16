import { Camera, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { PhotoThumb } from '@/components/ui/PhotoThumb';
import { useApp } from '@/context/AppContext';

export function PhotoUploadScreen() {
  const { photos, setPhotos, isLoading, handlePickPhoto, handleSubmitPhotos } = useApp();
  return (
    <div className="p-5 up">
      <Alert title="Antes de descartar">
        Fotografe o lixo separado e depois a embalagem já lacrada. Serão usadas na auditoria da
        Prefeitura.
      </Alert>
      {['Foto 1 - Lixo separado', 'Foto 2 - Embalagem lacrada'].map((l, i) => (
        <div key={l} className="mb-4">
          <p className="text-sm font-bold mb-1">
            {l} <span className="text-err">*</span>
          </p>
          <div
            className={
              'border-2 rounded-lg p-3 flex items-center gap-3 ' +
              (photos[i] ? 'border-ok bg-ok-l' : 'border-dashed border-[#888] bg-white')
            }
          >
            <div className="w-24 h-24 rounded-md overflow-hidden bg-[#F0F0F0] flex items-center justify-center text-mut shrink-0">
              {photos[i] ? (
                <PhotoThumb photo={photos[i]} index={i} className="w-full h-full" />
              ) : (
                <Camera size={32} />
              )}
            </div>
            <div className="flex-1 space-y-2">
              {photos[i] ? (
                <p className="text-sm font-bold text-ok flex items-center gap-1">
                  <Check size={16} />
                  Foto anexada
                </p>
              ) : (
                <p className="text-xs text-mut">Nenhuma foto anexada</p>
              )}
              <label className="block text-center text-sm font-bold text-pri border-2 border-pri rounded-full py-2 cursor-pointer hover:bg-pri-l">
                {photos[i] ? 'Refazer foto' : 'Tirar foto'}
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handlePickPhoto(i, e.target.files?.[0])}
                />
              </label>
              {!photos[i] && (
                <button
                  className="text-xs text-pri underline w-full"
                  onClick={() => {
                    const n = [...photos];
                    n[i] = { sample: 1 };
                    setPhotos(n);
                  }}
                >
                  Usar foto de exemplo (demo)
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      <p className="text-xs text-mut mb-3 text-center">
        {photos.filter(Boolean).length} de 2 fotos anexadas
      </p>
      <Button onClick={handleSubmitPhotos} loading={isLoading}>
        ENVIAR FOTOS E GERAR CÓDIGO
      </Button>
    </div>
  );
}
