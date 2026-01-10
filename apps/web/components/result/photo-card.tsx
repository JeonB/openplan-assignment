'use client';

import Image from 'next/image';
import Skeleton from '../ui/skeleton';

interface PhotoCardProps {
  downloadUrl: string | null;
  isLoading?: boolean;
}

export default function PhotoCard({ downloadUrl, isLoading }: PhotoCardProps) {
  if (isLoading || !downloadUrl) {
    return (
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl shadow-lg">
      <Image
        src={downloadUrl}
        alt="Photo"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1440px) 688px, 600px"
        priority
      />
    </div>
  );
}
