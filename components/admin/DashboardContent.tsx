import { Card, CardContent } from "@/components/ui/card";

export default function DashboardContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Stats Cards */}
      <Card className="bg-gradient-to-br from-amber-100 via-purple-100 to-white dark:from-amber-900 dark:via-purple-900 dark:to-slate-900 shadow-xl border-0">
        <CardContent className="p-8 flex flex-col items-center">
          <span className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">120</span>
          <span className="text-lg text-slate-700 dark:text-white">Total Items</span>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-purple-100 via-amber-100 to-white dark:from-purple-900 dark:via-amber-900 dark:to-slate-900 shadow-xl border-0">
        <CardContent className="p-8 flex flex-col items-center">
          <span className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">8</span>
          <span className="text-lg text-slate-700 dark:text-white">Categories</span>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-slate-100 via-amber-100 to-white dark:from-slate-900 dark:via-amber-900 dark:to-purple-900 shadow-xl border-0">
        <CardContent className="p-8 flex flex-col items-center">
          <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">35</span>
          <span className="text-lg text-slate-700 dark:text-white">Orders</span>
        </CardContent>
      </Card>
      {/* Welcome Banner */}
      <div className="col-span-1 md:col-span-3 mt-8">
        <Card className="bg-gradient-to-r from-amber-400 via-purple-400 to-amber-600 dark:from-amber-700 dark:via-purple-700 dark:to-amber-900 shadow-2xl border-0">
          <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome to Mejlis Admin Dashboard</h2>
              <p className="text-lg text-white/90">Manage your categories, items, and orders with ease. Use the side menu to navigate.</p>
            </div>
            <img src="/placeholder-logo.svg" alt="Logo" className="w-32 h-32 md:ml-8 mt-6 md:mt-0 rounded-full shadow-lg border-4 border-white/30" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
