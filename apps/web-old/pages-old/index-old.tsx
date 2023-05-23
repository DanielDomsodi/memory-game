'use client';

import { Container } from '@chakra-ui/react';
import {
  createServerSupabaseClient,
  Session,
} from '@supabase/auth-helpers-nextjs';
import {
  useSession,
  useSessionContext,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/layout';

// export const getServerSideProps: GetServerSideProps<{
//   session: Session;
//   user: Session['user'];
// }> = async (ctx: GetServerSidePropsContext) => {
//   const supabase = createServerSupabaseClient(ctx);

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   console.log('server props: ', session);

//   if (!session)
//     return {
//       redirect: {
//         destination: '/sign-in',
//         permanent: false,
//       },
//     };

//   return {
//     props: {
//       session,
//       user: session.user,
//     },
//   };
// };

// type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export function Home() {
  // const { session, user } = props;
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { isLoading, session } = useSessionContext();

  // console.log('Home page: ', { user, session });
  console.log('Home page: ', { isLoading, session });

  // const user = useUser();

  // useEffect(() => {
  //   // console.log('user (Home): ', user);
  //   console.log('session (Home): ', session);
  //   // console.log('session (Home): ', isLoading);
  //   if (!isLoading && !session) {
  //     router.push('/sign-in');
  //   }
  // }, [router, session, isLoading]);

  // useEffect(() => {
  //   console.log('session home: ', session);
  // }, [session]);

  useEffect(() => {
    // async function getProfile() {
    //   const { data } = await supabase
    //     .from('profiles')
    //     .select('id, first_name, avatar_url');
    //   console.log('profile: ', data);
    // }

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('auth state change', { event, session });

      // getProfile();
    });

    return () => {
      authListener.unsubscribe();
    };

    //   // console.log('data: ', );
  }, [supabase.auth]);

  // useEffect(() => {
  //   if (!session) {
  //     router.push('/sign-in');
  //   }
  // }, [session, router]);

  // useEffect(() => {
  //   async function getProfile() {
  //     const { data } = await supabase
  //       .from('profiles')
  //       .select('id, username, avatar_url, website');
  //     console.log('profile: ', data);
  //   }

  //   getProfile();
  // }, [supabase]);

  // if (isLoading) {
  //   return null;
  // }
  // if (!isLoading && session) {
  //   return <Layout>Home</Layout>;
  // }
  return <Layout>Home</Layout>;
}

export default Home;
