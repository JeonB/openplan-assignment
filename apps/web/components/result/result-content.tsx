'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@repo/ui/button';
import { usePhotoStore } from '../../lib/stores/photo-store';
import PhotoCard from './photo-card';
import InfoCards from './info-cards';

export default function ResultContent() {
  const router = useRouter();
  const { photoData, hasViewed, clearPhotoData } = usePhotoStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydration 완료 체크
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // 조회 이력이 없으면 1초 후 메인 페이지로 이동
  useEffect(() => {
    if (isHydrated && !hasViewed) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isHydrated, hasViewed, router]);

  const handlePrevious = () => {
    clearPhotoData();
    router.push('/');
  };

  // 조회 이력이 없으면 로딩 표시
  if (!isHydrated || !hasViewed) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <p className="text-gray-500">잠시 후 메인 페이지로 이동합니다...</p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {photoData?.download_url && (
        <div className="noise-texture fixed inset-0 -z-10">
          <Image
            src={photoData.download_url}
            alt="Background"
            fill
            className="object-cover blur-lg brightness-[0.3]"
            priority
            style={{ objectPosition: 'center' }}
          />
          {/* Radial gradient mask layer */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at center, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.7) 100%)',
            }}
          />
          {/* Additional dark overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 flex h-14 w-full items-center justify-center bg-black/30 backdrop-blur-sm">
        <h1 className="text-sm font-medium text-white">전승오</h1>
      </header>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-10 pb-[120px] xl:flex-row xl:items-start xl:gap-12 xl:px-8 xl:pb-10">
        {/* Photo Section */}
        <div className="w-full xl:w-1/2">
          <PhotoCard downloadUrl={photoData?.download_url ?? null} />
        </div>

        {/* Info Section */}
        <div className="flex w-full flex-col xl:w-1/2">
          <InfoCards photoData={photoData} />
          {/* Button - 데스크탑에서만 정보 영역 아래에 표시 */}
          <div className="hidden xl:mt-8 xl:flex xl:justify-end">
            <Button onClick={handlePrevious} className="w-[150px]" name="previous-button">
              이전
            </Button>
          </div>
        </div>
      </div>

      {/* Button - 모바일/태블릿에서 하단 고정 */}
      <div className="fixed bottom-[60px] left-1/2 z-10 -translate-x-1/2 px-5 xl:hidden">
        <Button onClick={handlePrevious} className="w-[335px] md:w-[280px]" name="previous-button">
          이전
        </Button>
      </div>
    </main>
  );
}
