export default function ZonesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Zone Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create New Zone
        </button>
      </div>
      <div className="bg-white p-6 rounded shadow-sm">
        <p className="text-gray-500 text-center py-8">No zones created yet.</p>
      </div>
    </div>
  );
}
