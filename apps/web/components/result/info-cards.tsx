'use client';

import Skeleton from '../ui/skeleton';
import type { PhotoData } from '../../lib/types/photo.types';

interface InfoCardsProps {
  photoData: PhotoData | null;
  isLoading?: boolean;
}

interface InfoRowProps {
  label: string;
  value: string | number | null;
  isLink?: boolean;
  isLoading?: boolean;
}

function InfoRow({ label, value, isLink, isLoading }: InfoRowProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-500">{label}</span>
        <Skeleton className="h-5 w-24" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-500">{label}</span>
      {isLink && value ? (
        <a
          href={String(value)}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-sm text-blue-600 hover:underline"
        >
          {String(value)}
        </a>
      ) : (
        <span className="text-sm text-gray-900">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
      )}
    </div>
  );
}

export default function InfoCards({ photoData, isLoading }: InfoCardsProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* ID & Author Card */}
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-2">
          <InfoRow label="id" value={photoData?.id ?? null} isLoading={isLoading} />
          <InfoRow label="author" value={photoData?.author ?? null} isLoading={isLoading} />
        </div>
      </div>

      {/* Width & Height Card */}
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <InfoRow label="width" value={photoData?.width ?? null} isLoading={isLoading} />
          <InfoRow label="height" value={photoData?.height ?? null} isLoading={isLoading} />
        </div>
      </div>

      {/* URL & Download URL Card */}
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4">
          <InfoRow
            label="url"
            value={photoData?.url ?? null}
            isLink
            isLoading={isLoading}
          />
          <InfoRow
            label="download_url"
            value={photoData?.download_url ?? null}
            isLink
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
