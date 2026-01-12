'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@repo/ui/button';
import { usePhotoStore } from '../../lib/stores/photo-store';
import { usePhotoMutation } from '../../lib/hooks/use-photo';
import Header from '../layout/header';

export default function HomeContent() {
  const router = useRouter();
  const hasViewed = usePhotoStore((state) => state.hasViewed);
  const { mutate, isPending } = usePhotoMutation();

  // 조회 이력이 있으면 result 페이지로 자동 이동
  useEffect(() => {
    if (hasViewed) {
      router.push('/result');
    }
  }, [hasViewed, router]);

  const handleNext = () => {
    mutate(undefined, {
      onSuccess: () => {
        router.push('/result');
      },
    });
  };

  // 조회 이력이 있으면 리다이렉트 중이므로 빈 화면 표시
  if (hasViewed) {
    return null;
  }

  return (
    <main className="bg-background flex min-h-screen flex-col">
      {/* Header */}
      <Header variant="light" />

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center p-[10px]">
        <div className="text-center">
          <p className="text-black-100 text-[28px] leading-[1.4] font-semibold tracking-[-0.48px] md:tracking-[-0.56px] xl:text-[32px]">
            안녕하세요
          </p>
          <p className="text-black-100 text-[28px] leading-[1.4] font-semibold tracking-[-0.48px] md:tracking-[-0.56px] xl:text-[32px]">
            전승오입니다.
          </p>
        </div>
      </div>

      {/* Button - Fixed at bottom */}
      <div className="flex justify-center px-5 py-10 xl:py-15">
        <Button
          onClick={handleNext}
          isLoading={isPending}
          className="h-12 w-full max-w-[335px] xl:h-15"
          name="next-button"
        >
          다음
        </Button>
      </div>
    </main>
  );
}
