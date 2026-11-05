
function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        TaskFlow
      </h1>

      <nav className="space-y-4">

        <a href="#" className="block bg-blue-600 p-3 rounded-lg">
          Dashboard
        </a>

        <a href="#" className="block p-3 text-slate-300 hover:bg-slate-800 rounded-lg">
          All Tasks
        </a>

        <a href="#" className="block p-3 text-slate-300 hover:bg-slate-800 rounded-lg">
          Pending
        </a>

        <a href="#" className="block p-3 text-slate-300 hover:bg-slate-800 rounded-lg">
          Completed
        </a>

      </nav>

    </aside>
  );
}

export default Sidebar;
