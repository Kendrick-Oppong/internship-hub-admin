"use client";

import { MoreHorizontal, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Student } from "@/types/api/student";

interface StudentListProps {
  students: Student[];
}

export function StudentList({ students }: Readonly<StudentListProps>) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div className="w-full border border-slate-300 rounded-lg overflow-hidden shadow-card bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 h-12">
            <TableHead className="font-semibold text-slate-600">Name</TableHead>
            <TableHead className="font-semibold text-slate-600">
              Index Number
            </TableHead>
            <TableHead className="font-semibold text-slate-600">
              Department
            </TableHead>
            <TableHead className="font-semibold text-slate-600">
              Faculty
            </TableHead>
            <TableHead className="font-semibold text-slate-600">
              Programme/Level
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length > 0 ? (
            students.map((student) => (
              <TableRow
                key={student.id}
                className="hover:bg-slate-50/50 transition-colors h-14"
              >
                <TableCell>
                  {student.firstName} {student.lastName}
                </TableCell>

                <TableCell>{student.studentProfile.indexNumber}</TableCell>

                <TableCell>{student.studentProfile.department}</TableCell>

                <TableCell>{student.studentProfile.faculty}</TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm">
                      {student.studentProfile.programme}
                    </span>
                    {student.studentProfile.level && (
                      <span className="text-xs text-slate-400">
                        Level {student.studentProfile.level}
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <DropdownMenu
                    open={openMenuId === student.id}
                    onOpenChange={(open) =>
                      setOpenMenuId(open ? student.id : null)
                    }
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600 focus-visible:ring-1"
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Eye className="h-4 w-4 text-slate-500" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Edit className="h-4 w-4 text-slate-500" />
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="h-14">
              <TableCell colSpan={6} className="text-center font-semibold">
                No students found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
