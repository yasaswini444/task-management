
import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all tasks
export const getTasks = async () => {
  const response = await API.get("/tasks");
  return response.data;
};

// Create a new task
export const createTask = async (task) => {
  const response = await API.post("/tasks", task);
  return response.data;
};

// Update an existing task
export const updateTask = async (id, task) => {
  const response = await API.put(`/tasks/${id}`, task);
  return response.data;
};

// Delete a task
export const deleteTask = async (id) => {
  const response = await API.delete(`/tasks/${id}`);
  return response.data;
};
