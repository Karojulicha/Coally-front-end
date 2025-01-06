import { Box, Flex, Link, Spacer, } from "@chakra-ui/react";


interface LayoutDefaultProps {
    children: React.ReactNode;
}
export const LayoutDefault = ({ children }: LayoutDefaultProps) => {
  return (
    <Box p="4vh">
      <Flex align="center">
        <Link fontSize="xl" fontWeight="bold" href="http://localhost:5173">
          Catch Up
        </Link>
        <Spacer />
        <Flex gap={6}>
          <Link rel="login" href="http://localhost:5173/login">
            Login
          </Link>
          <Link rel="sing_in" href="http://localhost:5173/signin">
            SingIn
          </Link>
        </Flex>
      </Flex>
      <main>{children}</main>
    </Box>
  );
};
