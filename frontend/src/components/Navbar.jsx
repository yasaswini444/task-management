
function Navbar() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between">

      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Manage your tasks efficiently
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Notification */}
        <button className="text-xl hover:text-blue-600">
          🔔
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
            P
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              Admin
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;
