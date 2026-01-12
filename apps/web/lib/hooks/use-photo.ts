'use client';

import { useMutation } from '@tanstack/react-query';
import { fetchPhotoAction } from '../actions/photo';
import { usePhotoStore } from '../stores/photo-store';
import type { PhotoData } from '../types/photo.types';

/**
 * TanStack Query와 Server Action을 결합해 사진 데이터를 조회하는 커스텀 훅
 * 조회된 데이터를 Zustand 스토어에 저장합니다.
 */
export function usePhotoMutation() {
  const setPhotoData = usePhotoStore((state) => state.setPhotoData);

  return useMutation({
    mutationFn: fetchPhotoAction,
    onSuccess: (data: PhotoData) => {
      setPhotoData(data);
    },
  });
}
