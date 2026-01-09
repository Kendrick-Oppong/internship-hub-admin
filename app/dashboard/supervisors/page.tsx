export default function SupervisorsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Supervisors</h1>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-300 px-4 py-2 rounded hover:bg-gray-50">
            Import CSV
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Supervisor
          </button>
        </div>
      </div>
      <div className="bg-white rounded shadow-sm">
        <div className="p-4 border-b border-gray-200 grid grid-cols-4 gap-4 font-medium text-sm text-gray-500">
          <div>Name</div>
          <div>Email</div>
          <div>Zone</div>
          <div>Status</div>
        </div>
        <div className="p-8 text-center text-gray-500">
          No supervisors found.
        </div>
      </div>
    </div>
  );
}
