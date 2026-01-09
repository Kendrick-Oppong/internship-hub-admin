export default function ReportsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reports & Downloads</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow-sm">
          <h3 className="font-bold mb-2">Student Reports</h3>
          <p className="text-sm text-gray-500 mb-4">
            Download all student internship reports.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
            Download PDF
          </button>
        </div>
        <div className="bg-white p-6 rounded shadow-sm">
          <h3 className="font-bold mb-2">Supervision Logs</h3>
          <p className="text-sm text-gray-500 mb-4">
            Export supervision activity logs.
          </p>
          <button className="bg-white border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 w-full">
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}
