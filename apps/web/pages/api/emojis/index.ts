import { EmojisUrlQuery } from '@memory-game/api';
import { prisma } from '@memory-game/prisma';
import { Emoji, Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface GetEmojisRequest extends NextApiRequest {
  query: Partial<EmojisUrlQuery>;
}

const allowedMethods = ['GET'];

export default async function handler(
  req: GetEmojisRequest,
  res: NextApiResponse<Emoji[] | { message: string }>
) {
  try {
    if (!allowedMethods.includes(req.method) || req.method === 'OPTIONS') {
      return res.status(405).send({ message: 'Method not allowed.' });
    }

    const { category, limit } = req.query;
    const sqlQuery = Prisma.sql`
      SELECT * FROM emojis
      WHERE "category_id" = ${Number(category)}
      ORDER BY random() limit ${Number(limit)}`;
    const emojis = await prisma.$queryRaw<Emoji[]>(sqlQuery);

    return res.status(200).json(emojis);
  } catch (error) {
    return res.status(500).send({ message: 'Server error.' });
  }
}
