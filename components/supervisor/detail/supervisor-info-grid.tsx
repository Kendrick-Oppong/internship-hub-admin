import { Label } from "@/components/ui/label";
import { Supervisor } from "@/types/api/supervisor";
import {
  Building2,
  GraduationCap,
  Hash,
  User,
  Calendar,
  Phone,
  Mail,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface SupervisorInfoGridProps {
  supervisor: Supervisor;
}

export function SupervisorInfoGrid({
  supervisor,
}: Readonly<SupervisorInfoGridProps>) {
  const profile = supervisor.supervisorProfile;

  return (
    <div className="space-y-8">
      {/* Professional Information */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <GraduationCap size={18} />
          </div>
          <h4 className="font-bold text-slate-900">Professional Information</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoItem
            icon={<Hash size={14} />}
            label="Staff ID"
            value={supervisor.staffId}
          />
          <InfoItem
            icon={<Building2 size={14} />}
            label="Department"
            value={profile.department}
          />
          <InfoItem
            icon={<GraduationCap size={14} />}
            label="Specialization"
            value={profile.specialization || "Not specified"}
          />
        </div>
      </div>

      {/* Account & Contact Information */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="size-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
            <User size={18} />
          </div>
          <h4 className="font-bold text-slate-900">Account & Contact Info</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoItem
            icon={<Mail size={14} />}
            label="Email Address"
            value={supervisor.auth.email}
          />
          <InfoItem
            icon={<Phone size={14} />}
            label="Phone Number"
            value={profile.phoneNumber || "Not specified"}
          />
          <InfoItem
            icon={<ShieldCheck size={14} />}
            label="Account Status"
            value={supervisor.auth.isActive ? "Active" : "Inactive"}
          />
          <InfoItem
            icon={<Clock size={14} />}
            label="Last Login"
            value={
              supervisor.auth.lastLoginAt
                ? formatDate(supervisor.auth.lastLoginAt)
                : "Never"
            }
          />
          <InfoItem
            icon={<Calendar size={14} />}
            label="Joined System"
            value={formatDate(supervisor.createdAt)}
          />
          {supervisor.auth.verifiedAt && (
            <InfoItem
              icon={<ShieldCheck size={14} />}
              label="Verified At"
              value={formatDate(supervisor.auth.verifiedAt)}
            />
          )}
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
