import Image from 'next/image';
import Skeleton from '../ui/skeleton';

interface PhotoCardProps {
  downloadUrl: string | null;
  isLoading?: boolean;
}

/**
 * 조회된 사진을 표시하는 Photo Card 컴포넌트
 * - 뷰포트에 따라 반응형 크기 조정
 */
export default function PhotoCard({ downloadUrl, isLoading }: PhotoCardProps) {
  if (isLoading || !downloadUrl) {
    return (
      <div className="relative aspect-3/2 w-full overflow-hidden rounded-3xl xl:max-w-[728px]">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  return (
    <div className="relative aspect-3/2 w-full overflow-hidden xl:max-w-[728px]">
      <Image
        src={downloadUrl}
        alt="Photo"
        fill
        sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1440px) 728px, 660px"
        className="rounded-3xl"
        priority
        fetchPriority="high"
      />
    </div>
  );
}
