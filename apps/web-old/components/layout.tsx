import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import Link from 'next/link';
import { IoMenu, IoPersonCircleOutline } from 'react-icons/io5';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Flex direction="column">
      <Box boxShadow="base">
        <Container maxW="container.xl">
          <HStack py={4} justify="space-between">
            <HStack>
              <Link href="/">
                <Image src="logo.svg" boxSize="32px" alt="Memory Game logo" />
              </Link>
              {/* <Heading size="md">Memory Game</Heading> */}
            </HStack>
            <Menu>
              <MenuButton
                as={Button}
                variant="outline"
                colorScheme="gray"
                borderRadius="full"
                pl={3}
                pr={1}
              >
                <HStack>
                  <Icon as={IoMenu} />
                  <Avatar
                    size="sm"
                    // name="Daniel Domsodi"
                    icon={<IoPersonCircleOutline fontSize="2.5em" />}
                  />
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuGroup title="Profile">
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                  <MenuItem>Logout</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </HStack>
        </Container>
      </Box>
      <Container>
        <Box as="main" flex={1}>
          {children}
        </Box>
      </Container>
    </Flex>
  );
}
