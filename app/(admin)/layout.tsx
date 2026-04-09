import Sidebar from "../../components/admin/Sidebar";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen bg-dark relative">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100">
                {children}
                {/* test comment */}
            </div>
        </div>
    );
}