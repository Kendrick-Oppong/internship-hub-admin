export default function PeriodsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Internship Periods</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Period
        </button>
      </div>
      <div className="bg-white rounded shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">Active Periods</h3>
        </div>
        <div className="p-8 text-center text-gray-500">
          No active periods found.
        </div>
      </div>
    </div>
  );
}
