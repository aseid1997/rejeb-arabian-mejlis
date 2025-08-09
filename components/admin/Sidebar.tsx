import Link from "next/link";
import { Package, Users, Plus, Edit, Trash2 } from "lucide-react";

const menu = [
  {
    section: "Main",
    items: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: <Package className="w-5 h-5" />,
      },
    ],
  },
  {
    section: "Management",
    items: [
      {
        label: "Categories",
        href: "/admin/categories",
        icon: <Users className="w-5 h-5" />,
      },
      {
        label: "Items",
        href: "/admin/items",
        icon: <Edit className="w-5 h-5" />,
      },
    ],
  },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-amber-50 via-purple-50 to-slate-100 dark:from-amber-900 dark:via-purple-900 dark:to-slate-900 shadow-xl flex flex-col min-h-screen">
      <div className="px-8 py-6 flex items-center space-x-3 border-b border-amber-200 dark:border-amber-800">
        <span className="text-2xl font-bold text-amber-600 dark:text-amber-400 tracking-tight">Mejlis Admin</span>
      </div>
      <nav className="flex-1 py-8 px-4 space-y-6">
        {menu.map((section) => (
          <div key={section.section}>
            <div className="uppercase text-xs font-bold text-amber-500 dark:text-amber-400 mb-2 px-2 tracking-wider">{section.section}</div>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-4 py-3 rounded-lg text-lg font-medium text-slate-700 dark:text-white hover:bg-amber-100 dark:hover:bg-amber-900/30 transition group"
                >
                  <span className="mr-3 text-amber-500 dark:text-amber-400 group-hover:scale-110 transition-transform">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="px-8 py-6 border-t border-amber-200 dark:border-amber-800 text-xs text-slate-500 dark:text-slate-400">
        &copy; {new Date().getFullYear()} Mejlis Admin
      </div>
    </aside>
  );
}
