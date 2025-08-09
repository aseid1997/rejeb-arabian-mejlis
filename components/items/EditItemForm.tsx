import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import type { Category, Item } from "./types";

interface EditItemFormProps {
  item: Item;
  categories: Category[];
  loading: boolean;
  onSubmit: (form: Omit<Item, "id" | "created_at">) => Promise<void>;
  onCancel: () => void;
}

export function EditItemForm({ item, categories, loading, onSubmit, onCancel }: EditItemFormProps) {
  const [form, setForm] = useState({
    name: item.name,
    description: item.description,
    image_url: item.image_url,
    stock_quantity: item.stock_quantity,
    category_id: item.category_id,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
      <Input placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
      <Input placeholder="Image URL" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} />
      <Input placeholder="Stock Quantity" type="number" value={form.stock_quantity} onChange={e => setForm(f => ({ ...f, stock_quantity: Number(e.target.value) }))} required />
      <label htmlFor="category-select-edit" className="block text-slate-700 dark:text-gray-200">Category</label>
      <select id="category-select-edit" value={form.category_id} onChange={e => setForm(f => ({ ...f, category_id: Number(e.target.value) }))} required className="w-full p-2 rounded border border-amber-500/30 bg-white/50 dark:bg-white/10 text-slate-800 dark:text-white">
        <option value="">Select Category</option>
        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
      </select>
      <DialogFooter>
        <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
        <DialogClose asChild>
          <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
}
