import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { PhotoData, PhotoState } from '../types/photo.types';

export const usePhotoStore = create<PhotoState>()(
  persist(
    (set) => ({
      photoData: null,
      hasViewed: false,
      setPhotoData: (data: PhotoData) =>
        set({
          photoData: data,
          hasViewed: true,
        }),
      clearPhotoData: () =>
        set({
          photoData: null,
          hasViewed: false,
        }),
    }),
    {
      name: 'photo-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
