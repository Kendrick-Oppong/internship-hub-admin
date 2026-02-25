import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getInitials } from "@/lib/utils";
import { Supervisor } from "@/types/api/supervisor";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SupervisorTableProps {
  supervisors: Supervisor[];
}

export function SupervisorTable({
  supervisors,
}: Readonly<SupervisorTableProps>) {
  return (
    <div className="w-full border border-slate-300 rounded-lg overflow-hidden shadow-card bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 h-12">
            <TableHead className="font-semibold text-slate-600">
              Supervisor
            </TableHead>
            <TableHead className="font-semibold text-slate-600">
              Staff ID
            </TableHead>
            <TableHead className="font-semibold text-slate-600">
              Department
            </TableHead>
            <TableHead className="font-semibold text-slate-600">
              Specialization
            </TableHead>
            <TableHead className="font-semibold text-slate-600 text-center">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supervisors.length > 0 ? (
            supervisors.map((supervisor) => (
              <TableRow
                key={supervisor.id}
                className="hover:bg-slate-50/50 transition-colors h-16"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-slate-200">
                      <AvatarImage src={supervisor.avatarUrl ?? ""} />
                      <AvatarFallback className="bg-slate-100 text-slate-600 text-xs">
                        {getInitials(supervisor.firstName, supervisor.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900">
                        {supervisor.firstName} {supervisor.lastName}
                      </span>
                      <span className="text-xs text-slate-500">
                        {supervisor.auth.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-slate-700">
                  {supervisor.staffId}
                </TableCell>
                <TableCell className="text-slate-600">
                  {supervisor.supervisorProfile.department}
                </TableCell>
                <TableCell
                  className="text-slate-600 max-w-[200px] truncate"
                  title={supervisor.supervisorProfile.specialization ?? ""}
                >
                  {supervisor.supervisorProfile.specialization || "N/A"}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={supervisor.auth.isActive ? "default" : "secondary"}
                    className={
                      supervisor.auth.isActive
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 shadow-none pb-0.5"
                        : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 shadow-none pb-0.5"
                    }
                  >
                    {supervisor.auth.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-slate-400 hover:text-primary hover:bg-primary/5 mr-2"
                    asChild
                  >
                    <Link href={`/dashboard/supervisors/${supervisor.id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View Details</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="h-14">
              <TableCell
                colSpan={5}
                className="text-center font-semibold text-slate-500"
              >
                No supervisors found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
