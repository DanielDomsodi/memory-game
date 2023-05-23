import { Box } from '@chakra-ui/react';

export type LayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: LayoutProps) {
  return (
    <Box
      w="100%"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      py={[12, 16]}
      bgGradient="linear(to-tr, cyan.400, pink.500)"
    >
      {children}
    </Box>
  );
}

export default AuthLayout;
