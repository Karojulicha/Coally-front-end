import { Grid, Heading, Input, Stack, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Field } from "./ui/field";
import { API_URL } from "../../auth/constants";
import { TaskList } from "./TaskList";
import { Layout } from "../layout/Layout";

export const Dashboard = () => {
  const [userData, setUserData] = useState<{ name: string } | null>(null);
  const [newTask, setNewTask] = useState<string>(""); // Tarea a agregar
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string>(""); // Mensaje de error

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:8000/api/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError("Hubo un problema al cargar los datos.");
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("No se encontró el token de autenticación.");
    }
  }, []);

  const handleSubmit = async () => {
    if (!newTask.trim()) {
      setError("Por favor ingrese una descripción para la tarea.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/dashboard/userId`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: newTask,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar la tarea.");
      }

      setNewTask(""); 
      setError(""); 
    } catch (error) {
      console.error("Error:", error);
      setError("Hubo un problema al agregar la tarea.");
    }
  };

  return (
    <div>
      {loading ? (
        <Text textAlign="center">Cargando...</Text>
      ) : false ? (
        <Text color="red.500" textAlign="center">
          {error}
        </Text>
      ) : (
        <Layout>
          <Grid m="3em" p="30vh" gap="5">
            <Heading>Hola, {userData?.name || "Usuario"}</Heading>
            <Stack as="form" onSubmit={handleSubmit}>
              <Heading as="h1" size="lg" textAlign="center" mb={6}>
                Agrega nuevas tareas
              </Heading>
              <Field>
                <Input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Descripción de la tarea"
                  size="lg"
                />
              </Field>
              <Button
                bg="blue.500"
                type="submit"
                //   isLoading={loading}
                //   loadingText="Guardando"
              >
                Agregar Tarea
              </Button>
            </Stack>
            <Grid mt={8}>
              <TaskList />
            </Grid>
          </Grid>
        </Layout>
      )}
    </div>
  );
};
