import React, { useEffect, useState } from "react";
import { Field } from "./ui/field";
import { LayoutDefault } from "../layout/LayoutDefault";
import { Box, Heading, Stack, Input, Button } from "@chakra-ui/react";
import { API_URL } from "../../auth/constants";
import { AuthResponseError } from "../../types/types";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorResponse, setErrorResponse] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          password,
          email,
        }),
      });
      console.log(response);
      if (password !== confirmPassword) {
        setErrorResponse("Passwords do not match");
        return;
      }
      
      if (response.ok) {
        setShowAlert(true);
        setErrorResponse("");
        navigate("/login");
        return;
      } else {
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
        
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    setShowAlert(false);
  }, [username, password, confirmPassword, email]);

  return (
    <LayoutDefault>
      <Box m="3em" p="2em">
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          Crear cuenta
        </Heading>
        <Stack as="form" onSubmit={handleSubmit}>
          <Field>
            <Input
              type="text"
              placeholder="me_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Field>

          <Field>
            <Input
              type="email"
              placeholder="me_email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>

          <Field>
            <Input
              type="password"
              placeholder="***********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>

          <Field>
            <Input
              type="password"
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Field>

          <Button
            type="submit"
            bg="teal.500"
            color="white"
            _hover={{ bg: "teal.600" }}
          >
            Registrarse
          </Button>
          {showAlert && (
            <Box color="green.400">User created, welcome to Catch Up</Box>
          )}
          {errorResponse && <Box color="red.400">{errorResponse}</Box>}
        </Stack>
      </Box>
    </LayoutDefault>
  );
};

export default SignIn;
