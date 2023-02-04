import { Category, Emoji, Response } from './api.model';

/**
 * Base url for the API.
 */
export const BASE_API_URL = 'https://api.emojisworld.fr/v1';

export async function getCategories(): Promise<Response<Category[]>> {
  const url = `${BASE_API_URL}/categories`;
  const response = await fetch(url);

  return response.json();
}

export async function getRandomEmojisByCategory(
  categoryId: number,
  limit = 10
): Promise<Response<Emoji[]>> {
  const url = `${BASE_API_URL}/random?categories=${categoryId}&limit=${limit}`;

  const response = await fetch(url);

  return response.json();
}
