import { Box, Flex, Link, Spacer, } from "@chakra-ui/react";


interface LayoutDefaultProps {
    children: React.ReactNode;
}
export const Layout = ({ children }: LayoutDefaultProps) => {
  return (
    <Box p="4vh">
      <Flex align="center">
        <Link fontSize="xl" fontWeight="bold" href="http://localhost:5173">
          Catch Up
        </Link>
        <Spacer />
      </Flex>
      <main>{children}</main>
    </Box>
  );
};
