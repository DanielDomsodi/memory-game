import { BASE_API_URL } from './api.constant';
import { Category, Emoji, Response } from './api.type';

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
