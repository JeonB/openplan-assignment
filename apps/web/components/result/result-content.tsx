'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@repo/ui/button';
import { usePhotoStore } from '../../lib/stores/photo-store';
import Header from '../layout/header';
import BackgroundLayer from './background-layer';
import PhotoCard from './photo-card';
import InfoCards from './info-cards';
import InfoCardsSkeleton from './info-cards-skeleton';

export default function ResultContent() {
  const router = useRouter();
  const { photoData, hasViewed, clearPhotoData } = usePhotoStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydration check for Zustand persist
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Redirect to home if no photo has been viewed
  useEffect(() => {
    if (isHydrated && !hasViewed) {
      const timer = setTimeout(() => router.push('/'), 1000);
      return () => clearTimeout(timer);
    }
  }, [isHydrated, hasViewed, router]);

  const handlePrevious = () => {
    clearPhotoData();
    router.push('/');
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col pb-15">
      {/* Background Layer */}
      <BackgroundLayer imageUrl={photoData?.download_url ?? null} />

      {/* Header */}
      <Header variant="dark" />

      {/* Content Wrapper for vertical centering */}
      <div className="mt-10 flex flex-1 items-center justify-center">
        {/* Mobile & Tablet: Vertical Stack / Desktop: Horizontal Split */}
        <div className="max-w-8xl mx-auto flex w-full flex-col items-center gap-10 xl:flex-row">
          {/* Photo Section */}
          <div className="relative flex w-full flex-col items-center px-5 xl:flex-1">
            <PhotoCard downloadUrl={photoData?.download_url ?? null} />
          </div>

          {/* Info Section */}
          <div className="flex w-full flex-col items-center gap-3 px-5 xl:flex-1">
            {/* Info Cards or Skeleton */}
            {photoData ? <InfoCards photoData={photoData} /> : <InfoCardsSkeleton />}

            {/* Previous Button */}
            <Button onClick={handlePrevious} className="h-12 w-full rounded-xl p-3 md:w-[154px]" name="previous-button">
              이전
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
