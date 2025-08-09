import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export interface Category {
  id: number;
  created_at: string;
  name: string;
}

interface CategoriesTableProps {
  categories: Category[];
  onEdit: (cat: Category) => void;
  onDelete: (cat: Category) => void;
  loading?: boolean;
}

export function CategoriesTable({ categories, onEdit, onDelete, loading }: CategoriesTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-amber-500/20 bg-white/60 dark:bg-black/40">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-amber-100 dark:bg-amber-900/30">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Created</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} className="border-t border-amber-200 dark:border-amber-900/30">
              <td className="px-4 py-2 font-medium">{cat.name}</td>
              <td className="px-4 py-2">{cat.created_at ? new Date(cat.created_at).toLocaleString() : "-"}</td>
              <td className="px-4 py-2 flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => onEdit(cat)} disabled={loading}><Edit className="w-5 h-5" /></Button>
                <Button size="icon" variant="ghost" onClick={() => onDelete(cat)} disabled={loading}><Trash2 className="w-5 h-5 text-red-500" /></Button>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center text-slate-500 py-6">No categories found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
