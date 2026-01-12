'use server';

import type { PhotoData } from '../types/photo.types';

const API_URL = 'https://picsum.photos/id/0/info';

/**
 * picsum.photos API에서 사진 데이터를 조회하는 서버 액션
 * @returns PhotoData
 */
export async function fetchPhotoAction(): Promise<PhotoData> {
  const response = await fetch(API_URL, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch photo data: ${response.status}`);
  }

  const data: PhotoData = await response.json();
  return data;
}
