'use client';

import { useMutation } from '@tanstack/react-query';
import { fetchPhotoData } from '../api/photo';
import { usePhotoStore } from '../stores/photo-store';
import type { PhotoData } from '../types/photo.types';

/**
 * Custom hook for fetching photo data using TanStack Query
 * Stores the fetched data in Zustand store
 */
export function usePhotoMutation() {
  const setPhotoData = usePhotoStore((state) => state.setPhotoData);

  return useMutation({
    mutationFn: fetchPhotoData,
    onSuccess: (data: PhotoData) => {
      setPhotoData(data);
    },
  });
}
