'use client';

import HCaptcha from '@hcaptcha/react-hcaptcha';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoAlertCircle, IoAt } from 'react-icons/io5';
import { z } from 'zod';
import { PasswordInputGroup } from './password-input-group';
import { useRouter } from 'next/navigation';
import { useSupabase } from '../app/supabase-provider';
import {
  Alert,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from '@memory-game/ui';

type AuthText = {
  headingTitle: string;
  headingHint?: string;
  button: string;
  accountQuestion: string;
  accountQuestionLink: string;
};

const AUTH_TEXTS: Record<AuthView, AuthText> = {
  'sign-in': {
    headingTitle: 'Welcome back',
    headingHint: 'Please enter your details.',
    button: 'Sign In',
    accountQuestion: `Don't have an account yet?`,
    accountQuestionLink: 'Sign Up',
  },
  'sign-up': {
    headingTitle: 'Create new account',
    button: 'Sign Up',
    accountQuestion: 'Do you have an account?',
    accountQuestionLink: 'Sign In',
  },
};

type AuthView = 'sign-up' | 'sign-in';

export type AuthProps = {
  redirectTo?: string;
  view?: AuthView;
};

const authSchema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(8),
});

type AuthForm = z.infer<typeof authSchema>;

export default function Auth(props: AuthProps) {
  const { redirectTo = '/', view = 'sign-in' } = props;

  const [authView, setAuthView] = useState(view);
  const [isLoading, setIsLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState<string | undefined>(undefined);
  const [captchaToken, setCaptchaToken] = useState<string | undefined>();
  const captcha = useRef<HCaptcha>(null);
  const { supabase } = useSupabase();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    getValues,
    reset,
  } = useForm<AuthForm>({
    resolver: zodResolver(authSchema),
  });
  const router = useRouter();

  const onValid: SubmitHandler<AuthForm> = () => {
    console.log('onValid');
    captcha.current?.resetCaptcha();
    captcha.current?.execute();
  };

  const isSignInView = authView === 'sign-in';

  useEffect(() => {
    setAuthView(view);
  }, [view]);

  useEffect(() => {
    async function auth() {
      setIsLoading(true);
      const { email, password } = getValues();

      const payload:
        | SignUpWithPasswordCredentials
        | SignInWithPasswordCredentials = {
        email,
        password,
        options: { captchaToken },
      };
      const {
        data: { user, session },
        error,
      } = isSignInView
        ? await supabase.auth.signInWithPassword(payload)
        : await supabase.auth.signUp(payload);
      setIsLoading(false);

      console.log('auth success: ', { user, session });

      if (error) {
        setErrorAlert(error.message);
        return;
      }

      if (user && !session) {
        reset();
        router.replace(redirectTo);
        return;
      }
    }

    if (captchaToken) {
      auth();
    }
  }, [
    supabase.auth,
    captchaToken,
    isSignInView,
    redirectTo,
    router,
    getValues,
    reset,
  ]);

  return (
    <div className="flex w-full flex-col gap-10 rounded-xl bg-white px-4 py-8 md:max-w-md md:p-8 lg:max-w-xl lg:p-12">
      <div className="flex flex-col items-center gap-6">
        <img src="logo.svg" className="h-[64px] w-[64px]" alt="" />
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-center text-4xl font-bold">
            {AUTH_TEXTS[authView].headingTitle}
          </h2>
          {AUTH_TEXTS[authView].headingHint && (
            <p className="text-gray-500">{AUTH_TEXTS[authView].headingHint}</p>
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onValid, (e) => {
          console.log('error: ', e);
        })}
        noValidate
      >
        <div className="mb-8 flex flex-col items-center gap-4">
          {errorAlert && (
            <Alert
              className="w-full"
              status="error"
              alertIcon={<IoAlertCircle />}
            >
              {errorAlert}
            </Alert>
          )}
          <InputGroup className="w-full" size="lg">
            <InputLeftElement pointerEvents="none">
              <IoAt />
            </InputLeftElement>
            <Input
              type="email"
              placeholder="Email address"
              {...register('email', { disabled: isLoading })}
            />
            {!!errors.email && (
              <div className="mt-2 text-sm text-red-500">
                {errors?.email?.message}
              </div>
            )}
          </InputGroup>

          <PasswordInputGroup
            className="w-full"
            size="lg"
            input={
              <Input
                {...register('password', { disabled: isLoading })}
                placeholder="Password"
              />
            }
          >
            {!!errors.password && (
              <div className="mt-2 text-sm text-red-500">
                {errors?.password?.message}
              </div>
            )}
          </PasswordInputGroup>

          {isSignInView && (
            <Link href="/forgot" className="self-end underline">
              Forgot password?
            </Link>
          )}
        </div>
        <Button type="submit" size="lg" full isLoading={isLoading}>
          {AUTH_TEXTS[authView].button}
        </Button>

        <HCaptcha
          ref={captcha}
          size="invisible"
          sitekey="8a5ac651-b5e0-465f-9015-60b4758ca342"
          onVerify={setCaptchaToken}
        />
      </form>
      <div className="mt-10 flex justify-center">
        <p className="text-center">
          {AUTH_TEXTS[authView].accountQuestion}{' '}
          <Link
            href={isSignInView ? '/signup' : '/signin'}
            className="underline"
          >
            {AUTH_TEXTS[authView].accountQuestionLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
