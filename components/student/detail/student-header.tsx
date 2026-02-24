import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";
import { CheckCircle2, Mail, Phone, Edit } from "lucide-react";
import { Student } from "@/types/api/student";
import { Button } from "@/components/ui/button";

interface StudentHeaderProps {
  student: Student;
}

export function StudentHeader({ student }: Readonly<StudentHeaderProps>) {
  const initials = getInitials(student.firstName, student.lastName);

  return (
    <div className="relative overflow-hidden">
      {/* Decorative Banner */}
      <div className="h-32 bg-linear-to-r rounded-lg from-slate-800 to-slate-700 relative">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-no-repeat bg-center bg-cover" />
      </div>

      <div className="px-6 pb-6">
        {/* Header Content with overlapping Avatar */}
        <div className="relative flex flex-col sm:flex-row items-center sm:items-end -mt-10 mb-6 gap-4">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md relative bg-white">
              <AvatarImage
                src={student.avatarUrl ?? ""}
                alt={`${student.firstName} ${student.lastName}`}
                className="object-cover object-top"
              />
              <AvatarFallback className="bg-indigo-100 text-indigo-700 text-3xl font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            {student.auth.verifiedAt && (
              <div className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center shadow-sm">
                <CheckCircle2 className="size-4 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left pt-2 sm:pt-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
              <h3 className="text-2xl font-bold text-slate-900">
                {student.firstName} {student.lastName}
              </h3>
              <Badge
                variant="secondary"
                className="w-fit mx-auto sm:mx-0 bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-50"
              >
                {student.studentProfile.session}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-slate-500 text-sm">
              <div className="flex items-center gap-1.5">
                <Mail size={14} className="text-slate-400" />
                <span>{student.auth.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={14} className="text-slate-400" />
                <span>{student.studentProfile.phoneNumber}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button size="sm" className="gap-2 px-3!">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
