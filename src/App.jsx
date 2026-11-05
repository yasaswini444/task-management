
import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import StatsCards from "./components/StatsCards";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "./services/taskService";

function App() {

  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();
      setTasks(data);

    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Unable to load tasks. Please check the backend.");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    try {
      await createTask({
        title: newTask.title,
        description: newTask.description,
        status: "PENDING"
      });

      await fetchTasks();
      setShowAddTask(false);

    } catch (error) {
      console.error("Error creating task:", error);
      alert("Unable to create task.");
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      await updateTask(id, {
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status
      });

      await fetchTasks();
      setEditingTask(null);

    } catch (error) {
      console.error("Error updating task:", error);
      alert("Unable to update task.");
    }
  };

  const handleDeleteTask = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      await deleteTask(id);
      await fetchTasks();

      alert("Task deleted successfully!");

    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Unable to delete task.");
    }
  };

  // Search and filter tasks
  const filteredTasks = tasks.filter((task) => {

    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "ALL" ||
      task.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex">

      <Sidebar />

      <main className="flex-1 min-w-0">

        <Navbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="p-8">

          {loading ? (

            <p className="text-center text-gray-500 py-10">
              Loading tasks...
            </p>

          ) : error ? (

            <p className="text-center text-red-600 py-10">
              {error}
            </p>

          ) : (

            <>
              <StatsCards tasks={tasks} />

              <TaskList
                tasks={filteredTasks}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                onAddTask={() => setShowAddTask(true)}
                onEditTask={(task) => setEditingTask(task)}
                onDeleteTask={handleDeleteTask}
              />
            </>

          )}

        </div>

      </main>

      {showAddTask && (
        <AddTask
          onClose={() => setShowAddTask(false)}
          onAddTask={addTask}
        />
      )}

      {editingTask && (
        <EditTask
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdateTask={handleUpdateTask}
        />
      )}

    </div>
  );
}

export default App;
