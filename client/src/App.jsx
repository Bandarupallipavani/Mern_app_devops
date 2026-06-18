'use client';

import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskDialog from './components/AddTaskDialog';
import LoadingSpinner from './components/LoadingSpinner';
import { taskService } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await taskService.getAllTasks();
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const response = await taskService.createTask(taskData);

      setTasks((prevTasks) => [response.data, ...prevTasks]);

      setIsDialogOpen(false);

      return {
        success: true,
      };
    } catch (err) {
      console.error('Error creating task:', err);

      return {
        success: false,
        error: err.message || 'Failed to create task',
      };
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      );
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task');
    }
  };

  const totalTasks = tasks.length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">

            <div>
              <h1 className="text-4xl font-bold">
                🚀 Task Manager Pro
              </h1>

              <p className="mt-2 text-white/80">
                MERN + Docker + GitHub Actions Demo....
              </p>
            </div>

            <button
              onClick={() => setIsDialogOpen(true)}
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              + Add Task
            </button>

          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-5">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-gray-400">Total Tasks</h3>
            <p className="text-4xl font-bold mt-2">{totalTasks}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-gray-400">Project</h3>
            <p className="text-xl font-semibold mt-2">
              DevOps Demo
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-gray-400">Status</h3>
            <p className="text-green-400 text-xl font-semibold mt-2">
              Running
            </p>
          </div>

        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-10">

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500 rounded-xl p-6 text-center">
            <h3 className="text-red-400 text-xl font-semibold">
              {error}
            </h3>

            <button
              onClick={fetchTasks}
              className="mt-4 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onDeleteTask={handleDeleteTask}
          />
        )}

      </main>

      {/* Add Task Dialog */}
      {isDialogOpen && (
        <AddTaskDialog
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleAddTask}
        />
      )}
    </div>
  );
}

export default App;