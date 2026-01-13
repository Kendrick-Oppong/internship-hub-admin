import { LoginForm } from "@/components/auth/login";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* LEFT - Hero section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-900 via-indigo-900 to-slate-900 opacity-90" />
        <div className="relative z-10 w-full flex flex-col items-center justify-center p-12 text-center text-white">
          <div className="mb-8 rounded-full bg-white p-6 backdrop-blur">
            <Image
              src="/images/ttu-logo.png"
              alt="Logo"
              width={140}
              height={140}
              className="mx-auto"
            />
          </div>
          <p className="max-w-md text-lg text-white/90">
            Smarter supervision. Clear insights. Better outcomes.
          </p>
        </div>
      </div>

      {/* RIGHT - Form area */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <LoginForm />
      </div>
    </div>
  );
}
