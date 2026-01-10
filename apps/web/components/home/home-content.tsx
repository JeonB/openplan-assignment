'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@repo/ui/button';
import { usePhotoStore } from '../../lib/stores/photo-store';
import { usePhotoMutation } from '../../lib/hooks/use-photo';

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
    <main className="flex min-h-screen flex-col items-center bg-[#FAFAFA] pb-[60px]">
      {/* Header */}
      <header className="flex h-14 w-full items-center justify-center border-b border-gray-200 bg-white">
        <h1 className="text-sm font-medium text-gray-900">전승오</h1>
      </header>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-5">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 md:text-3xl">안녕하세요</p>
          <p className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">전승오입니다.</p>
        </div>
      </div>

      {/* Button */}
      <div className="fixed bottom-[60px] left-1/2 -translate-x-1/2 px-5">
        <Button onClick={handleNext} isLoading={isPending} className="w-[335px] md:w-[280px]" name="next-button">
          다음
        </Button>
      </div>
    </main>
  );
}
