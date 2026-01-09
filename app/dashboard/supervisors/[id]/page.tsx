export default function SupervisorDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Supervisor Details</h1>
      <div className="bg-white p-6 rounded shadow-sm mb-6">
        <h2 className="text-lg font-bold mb-4">Profile Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-500">Name</label>
            <p className="font-medium">Supervisor Name</p>
          </div>
          <div>
            <label className="block text-sm text-gray-500">Email</label>
            <p className="font-medium">email@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
