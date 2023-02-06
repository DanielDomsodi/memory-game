import { Emoji, EmojiCategory } from '@prisma/client';
import { BASE_API_URL } from '../api.const';

export interface EmojisUrlQuery {
  category?: string;
  limit?: string;
}

/**
 * Get all emoji categories.
 */
export async function getCategories(): Promise<EmojiCategory[]> {
  const url = `${BASE_API_URL}/emojis/categories`;
  const response = await fetch(url);

  return response.json();
}

/**
 * Get random emojis by category id. Default limit is 10.
 */
export async function getRandomEmojisByCategory(
  categoryId: number,
  limit = 10
): Promise<Emoji[]> {
  const searchParams = new URLSearchParams({
    category: categoryId.toString(),
    limit: limit.toString(),
  });
  const url = `${BASE_API_URL}/emojis?${searchParams.toString()}`;
  const response = await fetch(url);

  return response.json();
}
