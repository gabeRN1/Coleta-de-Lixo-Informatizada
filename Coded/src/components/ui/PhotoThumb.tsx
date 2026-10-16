import type { Foto } from '@/types';
import { SamplePhoto } from './SamplePhoto';

interface PhotoThumbProps {
  photo?: Foto | null;
  index: number;
  className?: string;
}

export function PhotoThumb({ photo, index, className = '' }: PhotoThumbProps) {
  return (
    <div className={`overflow-hidden bg-slate-200 ${className}`}>
      {photo?.url ? (
        <img src={photo.url} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
      ) : (
        <SamplePhoto index={index} />
      )}
    </div>
  );
}
