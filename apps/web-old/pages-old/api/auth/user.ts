import { supabaseClient } from '../../../config/supabase-client';
import type { NextApiRequest, NextApiResponse } from 'next';

const allowedMethods = ['GET'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!allowedMethods.includes(req.method) || req.method === 'OPTIONS') {
      return res.status(405).send({ message: 'Method not allowed.' });
    }

    const response = await supabaseClient.auth.getUser();

    return res.status(response.error.status ?? 200).json(response);
  } catch (error) {
    // TODO: create a middleware to avoid code duplication like error handling and allowed method checking
    return res.status(500).send({ message: 'Server error.' });
  }
}
