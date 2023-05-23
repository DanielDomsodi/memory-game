import { UserResponse } from '@supabase/supabase-js';
import { BASE_API_URL } from '../api.const';

export interface AuthPayload {
  email: string;
  password: string;
  options?: {
    captchaToken?: string;
  };
}

export async function signIn(payload: AuthPayload) {
  const url = `${BASE_API_URL}/auth/signin`;
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(payload),
  });

  return response.json();
}

export async function signUp(data: AuthPayload) {
  const url = `${BASE_API_URL}/auth/signup`;
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });

  return response
    .json()
    .then((v) => {
      console.log('SUCC');
      return v;
    })
    .catch((er) => {
      console.log('ERR');
    });
}

export async function getUser() {
  const url = `${BASE_API_URL}/auth/user`;
  const response = await fetch(url);

  return response.json() as Promise<UserResponse>;
}
