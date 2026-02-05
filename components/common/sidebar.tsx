import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  Calendar,
  Users,
  GraduationCap,
  FileBarChart,
  Settings,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { sideBarItems } from "@/lib/constants/dashboard";



export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Admin Portal</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {sideBarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white [&a]:last-of-type:mb-4",
                isActive && "bg-primary hover:bg-primary/90 text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}

        {/* Section: Analytics */}
        <div className="py-4 border-t border-b border-white/15">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Analytics
          </p>

          <Link
            href="/dashboard/reports"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white",
              pathname === "/dashboard/reports" &&
                "bg-primary hover:bg-primary/90 text-white"
            )}
          >
            <FileBarChart className="h-4 w-4" />
            Reports
          </Link>
        </div>

        {/* Section: System */}
        <div className="pt-4">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            System
          </p>

          <Link
            href="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/dashboard/settings"
                ? "bg-primary hover:bg-primary/90 text-white"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            )}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </nav>
    </aside>
  );
}
