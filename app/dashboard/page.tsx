import { DashboardStats } from "@/components/dashboard/statistics";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-lg font-bold mb-2">Overview</h1>
      <DashboardStats />

      <div className="bg-white p-6 rounded shadow-sm h-96">
        <h3 className="text-lg font-bold mb-1">Supervision Progress</h3>
        <div className="flex items-center justify-center h-full text-gray-400">
          Chart Placeholder
        </div>
      </div>
    </div>
  );
}
