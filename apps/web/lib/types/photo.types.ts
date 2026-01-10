/**
 * Photo API response type from picsum.photos
 * @see https://picsum.photos/
 */
export interface PhotoData {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

/**
 * Photo store state type for Zustand
 */
export interface PhotoState {
  photoData: PhotoData | null;
  hasViewed: boolean;
  setPhotoData: (data: PhotoData) => void;
  clearPhotoData: () => void;
}
