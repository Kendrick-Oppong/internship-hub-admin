import { SupervisorPage } from "@/components/supervisor/supervisor-page";
import { Suspense } from "react";

export default function SupervisorsPage() {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-card transition-shadow">
      <Suspense fallback={null}>
        <SupervisorPage />
      </Suspense>
    </div>
  );
}
