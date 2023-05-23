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

    const response = await supabaseClient.auth.signUp(req.body as AuthPayload);
    const {
      data: {
        session: { access_token, refresh_token },
      },
    } = response;

    // supabaseClient.auth.setSession({ access_token, refresh_token });

    return res.status(response.error?.status ?? 200).json(response);
  } catch (error) {
    // TODO: create a middleware to avoid code duplication like error handling and allowed method checking
    return res.status(500).send({ message: 'Server error.' });
  }
}
