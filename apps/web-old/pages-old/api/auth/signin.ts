import { supabaseClient } from '../../../config/supabase-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthPayload } from '@memory-game/api';

const allowedMethods = ['POST'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!allowedMethods.includes(req.method) || req.method === 'OPTIONS') {
      return res.status(405).send({ message: 'Method not allowed.' });
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword(
      req.body as AuthPayload
    );

    if (error) {
      console.log('SignIn error: ', error);
      return res.status(500).json({ message: error.message });
    }

    console.log('SignIn success: ', data);
    return res.status(200).json(data);
  } catch (error) {
    // TODO: create a middleware to avoid code duplication like error handling and allowed method checking
    return res.status(500).send({ message: 'Server error.' });
  }
}
