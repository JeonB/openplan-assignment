import type { PhotoData } from '../types/photo.types';

const API_URL = 'https://picsum.photos/id/0/info';

/**
 * Fetch photo data from picsum.photos API
 * @returns PhotoData
 */
export async function fetchPhotoData(): Promise<PhotoData> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch photo data: ${response.status}`);
  }

  const data: PhotoData = await response.json();
  return data;
}
