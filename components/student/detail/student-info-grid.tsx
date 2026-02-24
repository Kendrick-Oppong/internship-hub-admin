import { Label } from "@/components/ui/label";
import { Student } from "@/types/api/student";
import {
  BookOpen,
  Building2,
  GraduationCap,
  Hash,
  User,
  Calendar,
  Phone,
  Mail,
  Fingerprint,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface StudentInfoGridProps {
  student: Student;
}

export function StudentInfoGrid({ student }: Readonly<StudentInfoGridProps>) {
  const profile = student.studentProfile;

  return (
    <div className="space-y-8">
      {/* Academic Information */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <GraduationCap size={18} />
          </div>
          <h4 className="font-bold text-slate-900">Academic Information</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoItem
            icon={<Hash size={14} />}
            label="Index Number"
            value={profile.indexNumber}
          />
          <InfoItem
            icon={<Building2 size={14} />}
            label="Faculty"
            value={profile.faculty}
          />
          <InfoItem
            icon={<Building2 size={14} />}
            label="Department"
            value={profile.department}
          />
          <InfoItem
            icon={<BookOpen size={14} />}
            label="Programme"
            value={profile.programme}
          />
          <InfoItem
            icon={<Fingerprint size={14} />}
            label="Session"
            value={profile.session}
          />
          <InfoItem
            icon={<GraduationCap size={14} />}
            label="Certificate"
            value={profile.certificateType}
          />
          {profile.level && (
            <InfoItem
              icon={<Hash size={14} />}
              label="Level"
              value={`Level ${profile.level}`}
            />
          )}
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="size-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
            <User size={18} />
          </div>
          <h4 className="font-bold text-slate-900">Personal & Contact Info</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoItem
            icon={<Calendar size={14} />}
            label="Date of Birth"
            value={formatDate(profile.dateOfBirth)}
          />
          <InfoItem
            icon={<User size={14} />}
            label="Gender"
            value={profile.gender}
          />
          <InfoItem
            icon={<Mail size={14} />}
            label="Email Address"
            value={student.auth.email}
          />
          <InfoItem
            icon={<Phone size={14} />}
            label="Phone Number"
            value={profile.phoneNumber}
          />
          <InfoItem
            icon={<Calendar size={14} />}
            label="Joined System"
            value={formatDate(student.createdAt)}
          />
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
        {icon} {label}
      </Label>
      <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-100/80 font-medium text-slate-900 text-sm">
        {value || "Not specified"}
      </div>
    </div>
  );
}
