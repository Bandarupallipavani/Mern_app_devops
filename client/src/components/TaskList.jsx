import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center max-w-md w-full shadow-xl">
          <div className="text-5xl mb-4">📋</div>

          <h3 className="text-2xl font-bold text-white mb-3">
            No Tasks Yet
          </h3>

          <p className="text-gray-400">
            Start your productivity journey by adding your first task.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Your Tasks
          </h2>

          <p className="text-gray-400 mt-1">
            Total Tasks: {tasks.length}
          </p>
        </div>

        <div className="bg-blue-600 px-4 py-2 rounded-xl text-white font-semibold">
          {tasks.length} Tasks
        </div>
      </div>

      {/* Task Grid */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;