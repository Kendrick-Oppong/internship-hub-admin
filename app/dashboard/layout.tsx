import { Sidebar } from "@/components/common/sidebar";
import { Header } from "@/components/common/header";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div className="flex h-screen w-full overflow-hidden bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full">
          <Header />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
