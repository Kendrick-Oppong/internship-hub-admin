import Link from "next/link";
import { cn } from "@/lib/utils/class-names";

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Admin Portal</h1>
      </div>
      <nav className="space-y-2">
        <Link href="/dashboard" className="block p-2 hover:bg-gray-800 rounded">
          Dashboard
        </Link>
        <Link
          href="/dashboard/map"
          className="block p-2 hover:bg-gray-800 rounded"
        >
          Map & Zones
        </Link>
        <Link
          href="/dashboard/periods"
          className="block p-2 hover:bg-gray-800 rounded"
        >
          Internship Periods
        </Link>
        <Link
          href="/dashboard/supervisors"
          className="block p-2 hover:bg-gray-800 rounded"
        >
          Supervisors
        </Link>
        <Link
          href="/dashboard/students"
          className="block p-2 hover:bg-gray-800 rounded"
        >
          Students
        </Link>
        <Link
          href="/dashboard/reports"
          className="block p-2 hover:bg-gray-800 rounded"
        >
          Reports
        </Link>
      </nav>
    </aside>
  );
}
