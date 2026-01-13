export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Students</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Supervisors</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">
            Completed Supervisions
          </h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">
            Pending Supervisions
          </h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow-sm h-96">
        <h3 className="text-lg font-bold mb-4">Supervision Progress</h3>
        <div className="flex items-center justify-center h-full text-gray-400">
          Chart Placeholder
        </div>
      </div>
    </div>
  );
}
