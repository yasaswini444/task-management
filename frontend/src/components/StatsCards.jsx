
function StatsCards({ tasks }) {

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "PENDING"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const stats = [
    {
      title: "Total Tasks",
      count: totalTasks,
      color: "bg-blue-100",
      textColor: "text-blue-600",
      icon: "📋"
    },
    {
      title: "Pending",
      count: pendingTasks,
      color: "bg-yellow-100",
      textColor: "text-yellow-600",
      icon: "⏳"
    },
    {
      title: "In Progress",
      count: inProgressTasks,
      color: "bg-purple-100",
      textColor: "text-purple-600",
      icon: "⚡"
    },
    {
      title: "Completed",
      count: completedTasks,
      color: "bg-green-100",
      textColor: "text-green-600",
      icon: "✅"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((item) => (

        <div
          key={item.title}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >

          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold mt-2 text-slate-800">
                {item.count}
              </h2>
            </div>

            <div className={`${item.color} ${item.textColor} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
              {item.icon}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default StatsCards;
