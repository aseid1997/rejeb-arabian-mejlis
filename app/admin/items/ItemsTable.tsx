import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Item, Category } from "./types";

interface ItemsTableProps {
  items: Item[];
  categories: Category[];
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
  loading?: boolean;
}

export function ItemsTable({ items, categories, onEdit, onDelete, loading }: ItemsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-amber-500/20 bg-white/60 dark:bg-black/40">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-amber-100 dark:bg-amber-900/30">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Stock</th>
            <th className="px-4 py-2 text-left">Created</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-amber-200 dark:border-amber-900/30">
              <td className="px-4 py-2 font-medium">{item.name}</td>
              <td className="px-4 py-2">{categories.find(c => c.id === item.category_id)?.name || "-"}</td>
              <td className="px-4 py-2">{item.stock_quantity}</td>
              <td className="px-4 py-2">{item.created_at ? new Date(item.created_at).toLocaleString() : "-"}</td>
              <td className="px-4 py-2 flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => onEdit(item)} disabled={loading}><Edit className="w-5 h-5" /></Button>
                <Button size="icon" variant="ghost" onClick={() => onDelete(item)} disabled={loading}><Trash2 className="w-5 h-5 text-red-500" /></Button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-slate-500 py-6">No items found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
