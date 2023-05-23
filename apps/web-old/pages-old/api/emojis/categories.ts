import { EmojiCategory } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../config/prisma-client';

const allowedMethods = ['GET'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EmojiCategory[] | { message: string }>
) {
  try {
    if (!allowedMethods.includes(req.method) || req.method === 'OPTIONS') {
      return res.status(405).send({ message: 'Method not allowed.' });
    }

    const emojiCategories = await prisma.emojiCategory.findMany();

    return res.status(200).json(emojiCategories);
  } catch (error) {
    // TODO: create a middleware to avoid code duplication like error handling and allowed method checking
    return res.status(500).send({ message: 'Server error.' });
  }
}
