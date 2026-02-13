import { OverallProgress } from "@/components/dashboard/overall-progress";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentSupervisionLogs } from "@/components/dashboard/recent-logs";
import { DashboardStats } from "@/components/dashboard/statistics";
import { SupervisionProgress } from "@/components/dashboard/supervision-progress";

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-lg font-semibold mb-2">Overview</h1>
      <DashboardStats />
      <div className="flex gap-5">
        <SupervisionProgress />
        <QuickActions />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <OverallProgress />
        <RecentSupervisionLogs />
      </div>
    </div>
  );
}
