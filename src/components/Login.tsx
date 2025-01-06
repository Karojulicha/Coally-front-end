import React, { useState } from "react";
import { Box, Button, Heading, Input, Stack } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { LayoutDefault } from "../layout/LayoutDefault";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate, Navigate } from "react-router-dom";
import { API_URL } from "../../auth/constants";
import {
  AccessTokenResponse,
  AuthResponse,
  AuthResponseError,
} from "../../types/types";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();

  const requestNewAccessToken = async (refreshToken: string) => {
    try {
      const response = await fetch(`${API_URL}/refresh_token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Autorization: `Bearer ${refreshToken}`,
        },
      });

      if (response.ok) {
        const data = (await response.json()) as AccessTokenResponse;

        if (data.error) {
          throw new Error(data.error);
        }
        return data.body.accessToken;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });


      if (response.ok) {
        const data = (await response.json()) as AuthResponse;



        if (data.body.refreshToken && data.body.token) {
          auth.saveUser(data);
        }

        setErrorResponse("");
        navigate("/dashboard");
      } else {
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <LayoutDefault>
      <Box m="3em" p="30vh">
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          Iniciar sesión
        </Heading>
        <Stack as="form" onSubmit={handleSubmit}>
          <Field>
            <Input
              type="email"
              placeholder="me_email@gmail.com"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </Field>

          <Field>
            <Input
              type="password"
              placeholder="***********"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Field>

          <Button p="5" bg="gold" type="submit" alignItems="center">
            Iniciar sesión
          </Button>
          {errorResponse && <Box color="red.400">{errorResponse}</Box>}
        </Stack>
      </Box>
    </LayoutDefault>
  );
};

export default Login;
