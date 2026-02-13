"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { selectCurrentUser } from "@/lib/store/slices/auth-slice";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

export function Header() {
  const user = useAppSelector(selectCurrentUser);
  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`;

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h2 className="text-lg font-medium">Dashboard</h2>
      <div className="flex items-center gap-4">
        <Bell size={19} className="text-primary" />

        <div className="relative rounded-full">
          <Avatar className="h-10 w-10 border-2 border-white shadow-md">
            <AvatarImage
              src={user?.avatarUrl || "/placeholder.jpg"}
              alt="Profile"
              className="object-cover object-top"
            />
            <AvatarFallback className="bg-indigo-100 text-indigo-700 text-lg font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
