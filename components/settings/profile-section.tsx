"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AuthUser } from "@/types/auth";
import {
  CheckCircle2,
  Mail,
  Phone,
  Building2,
  Fingerprint,
  Camera,
  Shield,
} from "lucide-react";

const mockUser: AuthUser = {
  id: "c280772f-76ca-476a-b59e-f45f506406c1",
  email: "admin@ttu.edu.gh",
  firstName: "System",
  lastName: "Administrator",
  role: "ADMIN",
  avatarUrl:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // "https://github.com/shadcn.png"
  isVerified: true,
  isOnboarded: false,
  shouldResetPassword: false,
};

export function ProfileSection() {
  const initials = `${mockUser.firstName?.[0] || ""}${mockUser.lastName?.[0] || ""}`;

  return (
    <div className="relative overflow-hidden">
      {/* Decorative Banner */}
      <div className="h-32 bg-gradient-to-r rounded-lg from-primary to-primary/80 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      <div className="px-6 pb-6">
        {/* Header Content with overlapping Avatar */}
        <div className="relative flex flex-col sm:flex-row items-center sm:items-end -mt-10 mb-6 gap-4">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage
                src={mockUser.avatarUrl || "/placeholder.jpg"}
                alt="Profile"
                className="object-cover object-top"
              />
              <AvatarFallback className="bg-indigo-100 text-indigo-700 text-3xl font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-sm border border-white"
            >
              <Camera className="h-4 w-4 text-slate-600" />
            </Button>
          </div>

          <div className="flex-1 text-center sm:text-left pt-2 sm:pt-0">
            <h3 className="text-2xl font-bold text-slate-900">
              {mockUser.firstName} {mockUser.lastName}
            </h3>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500">
              <span className="text-sm font-medium">System Administrator</span>
              {mockUser.isVerified && (
                <CheckCircle2 className="h-4 w-4 text-blue-500 fill-blue-50" />
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button>Edit Profile</Button>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> Email Address
            </Label>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 font-medium text-slate-900 flex items-center justify-between">
              {mockUser.email}
              {mockUser.isVerified && (
                <div className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                  Verified
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" /> Role
            </Label>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 font-medium text-slate-900">
              {mockUser.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
