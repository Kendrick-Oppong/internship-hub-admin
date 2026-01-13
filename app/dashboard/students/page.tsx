export default function StudentsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Students</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search students..."
            className="border border-gray-300 rounded px-3 py-2"
          />
          <button className="bg-white border border-gray-300 px-4 py-2 rounded hover:bg-gray-50">
            Filter
          </button>
        </div>
      </div>
      <div className="bg-white rounded shadow-sm">
        <div className="p-4 border-b border-gray-200 grid grid-cols-5 gap-4 font-medium text-sm text-gray-500">
          <div>Name</div>
          <div>ID</div>
          <div>Zone</div>
          <div>Company</div>
          <div>Status</div>
        </div>
        <div className="p-8 text-center text-gray-500">
          No registered students found.
        </div>
      </div>
    </div>
  );
}
