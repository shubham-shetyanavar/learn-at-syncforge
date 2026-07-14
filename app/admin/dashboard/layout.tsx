import ProtectedRoute from "@/components/admin/ProtectedRoute";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[#2d2d2d] text-white">
        <Sidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
