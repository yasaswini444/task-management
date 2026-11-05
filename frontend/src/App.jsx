
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
  deleteTask,
} from "./services/taskService";

function App() {
  // Store all tasks
  const [tasks, setTasks] = useState([]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Modal states
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all tasks from backend
  const fetchTasks = async () => {
    try {
      setError("");

      const data = await getTasks();

      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Unable to load tasks. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks when component loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTask = async (newTask) => {
    try {
      await createTask({
        title: newTask.title,
        description: newTask.description,
        status: "PENDING",
        priority: newTask.priority,
        dueDate: newTask.dueDate || null,
      });

      await fetchTasks();

      setShowAddTask(false);
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Unable to add task. Please try again.");
    }
  };

  // Update an existing task
  const handleUpdateTask = async (id, updatedTask) => {
    try {
      await updateTask(id, {
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
        priority: updatedTask.priority,
        dueDate: updatedTask.dueDate || null,
      });

      await fetchTasks();

      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Unable to update task. Please try again.");
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteTask(id);

      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Unable to delete task. Please try again.");
    }
  };

  // Search and filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = (task.title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "ALL" ||
      task.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 min-w-0">

        {/* Navbar */}
        <Navbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <main className="p-8">

          {/* Dashboard Heading */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Dashboard
              </h1>

              <p className="text-gray-500 mt-2">
                Manage and track all your tasks in one place.
              </p>
            </div>

            <button
              onClick={() => setShowAddTask(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
            >
              + Add New Task
            </button>
          </div>

          {/* Statistics Cards */}
          <StatsCards tasks={tasks} />

          {/* Loading State */}
          {loading && (
            <div className="text-center py-10 text-gray-600">
              Loading tasks...
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-6">
              {error}

              <button
                onClick={fetchTasks}
                className="ml-4 underline font-semibold"
              >
                Retry
              </button>
            </div>
          )}

          {/* Task List */}
          {!loading && !error && (
            <div className="mt-8">
              <TaskList
                tasks={filteredTasks}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                onAddTask={() => setShowAddTask(true)}
                onEditTask={setEditingTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          )}

        </main>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <AddTask
          onAddTask={handleAddTask}
          onClose={() => setShowAddTask(false)}
        />
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTask
          task={editingTask}
          onUpdateTask={handleUpdateTask}
          onClose={() => setEditingTask(null)}
        />
      )}

    </div>
  );
}

export default App;
