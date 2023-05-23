'use client';

import { Container } from '@chakra-ui/react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { AuthSession, Session } from '@supabase/supabase-js';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

export const getServerSideProps: GetServerSideProps<{
  session: Session;
}> = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log('server props: ', session);

  if (!session)
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };

  return {
    props: {
      session,
    },
  };
};

type ProfileProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export function Profile(props: ProfileProps) {
  const { session } = props;

  console.log('session: ', session);

  return (
    <Container maxW="container.lg" centerContent>
      Profile
    </Container>
  );
}

export default Profile;
