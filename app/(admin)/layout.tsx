import { Toaster } from "react-hot-toast";
import AuthSessionSync from "../../components/admin/AuthSessionSync";
import AdminShell from "../../components/admin/AdminShell";
import "../globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#242424] overflow-hidden text-gray-200 font-sans">
        <AuthSessionSync />
        <AdminShell>{children}</AdminShell>

        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
