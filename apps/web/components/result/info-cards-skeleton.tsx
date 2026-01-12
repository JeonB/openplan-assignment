import Skeleton from '../ui/skeleton';

const cardStyle = 'rounded-2xl border border-black/[0.01] bg-white p-5';

/**
 * InfoCards용 스켈레톤 컴포넌트
 * - 로딩 상태에서도 InfoCards와 동일한 구조를 제공
 * - 실제 콘텐츠와 동일한 반응형 레이아웃 적용
 */
export default function InfoCardsSkeleton() {
  return (
    <div className="flex w-full flex-col gap-3">
      {/* ID & Author - Mobile: vertical, Tablet+: horizontal */}
      <div className={cardStyle}>
        <div className="flex flex-col gap-4 md:flex-row md:gap-4">
          <div className="flex flex-1 flex-col gap-1">
            <Skeleton className="h-5 w-8" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </div>

      {/* Width & Height - Mobile: vertical, Tablet+: horizontal */}
      <div className={cardStyle}>
        <div className="flex flex-col gap-4 md:flex-row md:gap-4">
          <div className="flex flex-1 flex-col gap-1">
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      </div>

      {/* URL & Download URL - All breakpoints: vertical */}
      <div className={cardStyle}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-8" />
            <Skeleton className="h-5 w-full max-w-[280px]" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-full max-w-[320px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
