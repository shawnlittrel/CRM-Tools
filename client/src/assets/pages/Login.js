import React from "react";
import {
  Box,
  Button,
  Heading,
  useColorModeValue,
  Center
} from "@chakra-ui/react";
import { Card } from "../components/Card";
import LoginForm from "../components/LoginForm";
import { ReactComponent as Shield } from "../images/shield.svg";

function Login() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "inherit")}
      minH="100vh"
      py="12"
      px={{
        base: "4",
        lg: "8"
      }}
    >
      <Box maxW="md" mx="auto">
        <Center>
          <Shield />
          <Heading textAlign="center" size="xl" fontWeight="bold">
            Sign in to your account
          </Heading>
        </Center>

        <Card>
          <LoginForm />
        </Card>
      </Box>
    </Box>
  );
}

export default Login;
