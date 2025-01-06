import { Box, Button, Text, VStack, HStack, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { TaskType } from "../../types/types";

interface TaskProps {
  task: TaskType;
  onDelete: (id: string) => void;
  onEdit: (task: TaskType) => void;
}

const Task = ({ task, onDelete, onEdit }: TaskProps) => {
  return (
    <Box
      p={4}
      mb={4}
      borderWidth={1}
      borderRadius="md"
      shadow="md"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
    >
      <Text flex={1}>{task.description}</Text>

      <HStack>
        <Button colorScheme="blue" size="sm" onClick={() => onEdit(task)}>
          Editar
        </Button>
        <Button colorScheme="red" size="sm" onClick={() => onDelete(task.id)}>
          Eliminar
        </Button>
      </HStack>
    </Box>
  );
};

export const TaskList = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskType | null>(null);
  const [newDescription, setNewDescription] = useState<string>("");

  // Cargar las tareas desde la API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://api.example.com/tasks"); // Cambia la URL por la de tu API
        const data: TaskType[] = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error al cargar las tareas:", error);
      }
    };
    fetchTasks();
  }, []);

  // Eliminar una tarea
  const deleteTask = async (id: string) => {
    try {
      await fetch(`https://api.example.com/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  // Editar una tarea
  const editTask = (task: TaskType) => {
    setIsEditing(true);
    setTaskToEdit(task);
    setNewDescription(task.description);
  };

  // Guardar los cambios de una tarea editada
  const saveTask = async () => {
    if (newDescription.trim() === "") return;

    if (taskToEdit) {
      const updatedTask: TaskType = {
        ...taskToEdit,
        description: newDescription,
      };

      try {
        await fetch(`https://api.example.com/tasks/${taskToEdit.id}`, {
          method: "PUT",
          body: JSON.stringify(updatedTask),
          headers: {
            "Content-Type": "application/json",
          },
        });

        setTasks(
          tasks.map((task) => (task.id === taskToEdit.id ? updatedTask : task))
        );
        setIsEditing(false);
        setTaskToEdit(null);
        setNewDescription("");
      } catch (error) {
        console.error("Error al editar la tarea:", error);
      }
    }
  };

  return (
    <Box p={6} maxW="lg" mx="auto">
      {isEditing ? (
        <VStack align="stretch">
          <Input
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            size="lg"
            placeholder="Edita la tarea"
          />
          <Button colorScheme="teal" onClick={saveTask}>
            Guardar cambios
          </Button>
          <Button colorScheme="gray" onClick={() => setIsEditing(false)}>
            Cancelar
          </Button>
        </VStack>
      ) : (
        <>
          {tasks.length === 0 ? (
            <Text color="gray.500" textAlign="center">
              No hay tareas aún, ¡agrega una!
            </Text>
          ) : (
            tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            ))
          )}
        </>
      )}
    </Box>
  );
};
