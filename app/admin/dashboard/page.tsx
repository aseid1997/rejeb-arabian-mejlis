"use client";

import DashboardContent from "@/components/admin/DashboardContent";
import { Sidebar } from "@/components/admin/Sidebar";

// import { Sidebar } from "@/components/admin/Sidebar";
// import DashboardContent from "@/components/admin/DashboardContent";

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <DashboardContent />
            </main>
        </div>
    );
}
