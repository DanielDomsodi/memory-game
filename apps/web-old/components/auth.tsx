import {
  Alert,
  AlertIcon,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  SupabaseClient,
} from '@supabase/supabase-js';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoAt } from 'react-icons/io5';
import { z } from 'zod';
import { PasswordInputGroup } from '../pages-old/password-input-group';

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

export type AuthProps<Database> = {
  supabaseClient: SupabaseClient<Database>;
  redirectTo?: string;
  view?: AuthView;
};

const authSchema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(8),
});

type AuthForm = z.infer<typeof authSchema>;

type Alert = {
  type: 'info' | 'error';
  message: string;
};

export default function Auth<Database>(props: AuthProps<Database>) {
  const { redirectTo = '/', supabaseClient, view = 'sign-in' } = props;

  const [authView, setAuthView] = useState(view);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<Alert | undefined>(undefined);
  const [captchaToken, setCaptchaToken] = useState<string | undefined>();
  const captcha = useRef<HCaptcha>();
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
    captcha.current.resetCaptcha();
    captcha.current.execute();
  };

  const isSignInView = authView === 'sign-in';

  useEffect(() => {
    setAuthView(view);
  }, [view]);

  useEffect(() => {
    console.log('EFFECT');

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
        ? await supabaseClient.auth.signInWithPassword(payload)
        : await supabaseClient.auth.signUp(payload);
      setIsLoading(false);

      console.log('auth success: ', { user, session });

      if (error) {
        setAlert({ type: 'error', message: error.message });
        return;
      }

      if (user && !session) {
        setAlert({
          type: 'info',
          message: `Confirmation email has been sent to ${getValues().email}.`,
        });

        // reset();
        // router.replace(redirectTo);
        return;
      }
    }

    if (captchaToken) {
      auth();
    }
  }, [
    captchaToken,
    isSignInView,
    redirectTo,
    router,
    getValues,
    supabaseClient.auth,
    reset,
  ]);

  return (
    <VStack
      spacing={10}
      color={['white', null, 'inherit']}
      w="100%"
      maxW={[null, 'md', 'lg']}
      p={[4, 4, 12]}
      borderRadius="lg"
      backgroundColor={[null, null, 'white']}
      alignItems="stretch"
    >
      <VStack spacing={6}>
        <Image src="logo.svg" boxSize="64px" alt="" />
        <VStack>
          <Heading fontWeight="bold" textAlign="center">
            {AUTH_TEXTS[authView].headingTitle}
          </Heading>
          {AUTH_TEXTS[authView].headingHint && (
            <Text color={['whiteAlpha.700', null, 'gray']}>
              {AUTH_TEXTS[authView].headingHint}
            </Text>
          )}
        </VStack>
      </VStack>
      <form
        onSubmit={handleSubmit(onValid, (e) => {
          console.log('errro: ', e);
        })}
        noValidate
      >
        <VStack spacing={4} mb={8}>
          {alert && (
            <Alert status={alert.type}>
              <AlertIcon />
              {alert.message}
            </Alert>
          )}
          <FormControl isInvalid={!!errors.email}>
            <InputGroup variant={['outline-alpha', null, 'outline']} size="lg">
              <InputLeftElement pointerEvents="none">
                <Icon as={IoAt} />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="Email address"
                {...register('email')}
              />
            </InputGroup>
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors?.password}>
            <PasswordInputGroup
              input={<Input {...register('password')} placeholder="Password" />}
            ></PasswordInputGroup>
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>

          {isSignInView && (
            <Link
              as={NextLink}
              href="/forgot"
              alignSelf="flex-end"
              textDecoration="underline"
            >
              Forgot password?
            </Link>
          )}
        </VStack>
        <Button type="submit" w="100%" size="lg" isLoading={isLoading}>
          {AUTH_TEXTS[authView].button}
        </Button>

        <HCaptcha
          ref={captcha}
          size="invisible"
          sitekey="8a5ac651-b5e0-465f-9015-60b4758ca342"
          onVerify={setCaptchaToken}
        />
      </form>
      <Center mt={10}>
        <Text textAlign="center">
          {AUTH_TEXTS[authView].accountQuestion}{' '}
          <Link
            as={NextLink}
            href={isSignInView ? '/sign-up' : '/sign-in'}
            textDecoration="underline"
          >
            {AUTH_TEXTS[authView].accountQuestionLink}
          </Link>
        </Text>
      </Center>
    </VStack>
  );
}