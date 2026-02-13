"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export const SupervisionProgress = () => {
  const [timeRange, setTimeRange] = useState<"weekly" | "monthly">("weekly");

  return (
    <section className="flex-1 p-4 h-96 bg-white rounded-lg border border-gray-300 shadow-card transition-shadow">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold mb-3">Supervision Progress</h3>
        {/* Toggle */}
        <div className="relative inline-flex border border-gray-400/60 shadow-card rounded-full mb-4">
          <Button
            onClick={() => setTimeRange("weekly")}
            variant={timeRange === "weekly" ? "default" : "link"}
            size="sm"
            className={`w-20 hover:no-underline text-black h-8 rounded-l-2xl rounded-r-none p-0 transition-all duration-200 ease-in-out ${
              timeRange === "weekly" && "text-white"
            }`}
          >
            Weekly
          </Button>

          <Button
            onClick={() => setTimeRange("monthly")}
            variant={timeRange === "monthly" ? "default" : "link"}
            size="sm"
            className={`w-20 h-8 hover:no-underline text-black rounded-r-2xl rounded-l-none p-0 transition-all duration-200 ease-in-out ${
              timeRange === "monthly" && "text-white"
            }`}
          >
            Monthly
          </Button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex items-center justify-center h-full text-gray-400">
        {timeRange === "weekly"
          ? "Weekly Chart Placeholder"
          : "Monthly Chart Placeholder"}
      </div>
    </section>
  );
};
