export default function StudentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Student Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow-sm">
          <h2 className="text-lg font-bold mb-4">Personal Info</h2>
          {/* Details */}
        </div>
        <div className="bg-white p-6 rounded shadow-sm">
          <h2 className="text-lg font-bold mb-4">Internship Info</h2>
          {/* Details */}
        </div>
      </div>
    </div>
  );
}
