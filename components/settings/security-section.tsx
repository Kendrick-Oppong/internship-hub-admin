"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KeyRound, ShieldCheck, Laptop, Globe, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { getDeviceInfo } from "@/lib/utils";

export function SecuritySection() {
  const [deviceInfo, setDeviceInfo] = useState({
    device: "",
    browser: "",
    os: "",
  });

  useEffect(() => {
    const info = getDeviceInfo();
    setDeviceInfo(info);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-2 border-b">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Security & Authentication
          </h3>
          <p className="text-sm text-slate-500">
            Manage your credentials and session preferences.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Password Row */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all">
          <div className="flex gap-4 items-center">
            <div className="p-2.5 bg-white rounded-lg shadow-sm border border-slate-100 text-slate-500">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium text-slate-900">Password</div>
              <div className="text-sm text-slate-500">
                Last changed 3 months ago
              </div>
            </div>
          </div>
          <Button size="sm">Change Password</Button>
        </div>

        {/* 2FA Row */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all">
          <div className="flex gap-4 items-center">
            <div className="p-2.5 bg-white rounded-lg shadow-sm border border-slate-100 text-slate-500">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-900">
                  Two-Factor Authentication
                </span>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 hover:bg-green-100 font-normal py-0"
                >
                  Enabled
                </Badge>
              </div>
              <div className="text-sm text-slate-500">
                Using University OTP sent to email active on login.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Globe className="h-4 w-4 text-indigo-500" /> Active Sessions
        </h4>
        <div className="space-y-3">
          {/* Current Session */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all">
            <div className="flex items-center gap-4">
              <Laptop className="h-8 w-8 text-slate-400 stroke-1" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-slate-900">
                    {deviceInfo.device}
                  </span>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-medium border border-indigo-100">
                    Current Device
                  </span>
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-400 px-2">
              {deviceInfo.browser} on {deviceInfo.os}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
