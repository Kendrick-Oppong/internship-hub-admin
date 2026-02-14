import { InternshipPeriod } from "@/components/internship/internship-period";
import { Suspense } from "react";

export default function PeriodsPage() {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-card transition-shadow">
      <Suspense fallback={null}>
        <InternshipPeriod />
      </Suspense>
    </div>
  );
}
