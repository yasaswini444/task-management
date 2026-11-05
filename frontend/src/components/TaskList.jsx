
function TaskList({
  tasks,
  selectedStatus,
  onStatusChange,
  onAddTask,
  onEditTask,
  onDeleteTask
}) {

  const getStatusStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "IN_PROGRESS":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "COMPLETED":
        return "Completed";

      case "IN_PROGRESS":
        return "In Progress";

      default:
        return "Pending";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-8">

      <div className="p-6 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Recent Tasks
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Overview of your recent activities
          </p>
        </div>

        <div className="flex items-center gap-3">

          <select
            value={selectedStatus}
            onChange={(event) => onStatusChange(event.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Tasks</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <button
            onClick={onAddTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Task
          </button>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-slate-50 text-gray-500 text-sm">
            <tr>
              <th className="px-6 py-4">Task</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            {tasks.length === 0 ? (

              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No matching tasks found.
                </td>
              </tr>

            ) : (

              tasks.map((task) => (

                <tr
                  key={task.id}
                  className="border-t border-gray-100 hover:bg-slate-50"
                >

                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800">
                      {task.title}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {task.description}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {task.priority || "Not specified"}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(task.status)}`}>
                      {getStatusLabel(task.status)}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {task.dueDate || "Not specified"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">

                      <button
                        onClick={() => onEditTask(task)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default TaskList;
