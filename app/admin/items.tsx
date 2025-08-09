"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Edit, Trash2, Plus } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

interface Item {
  id: number;
  created_at: string;
  category_id: number;
  name: string;
  description: string;
  image_url: string;
  stock_quantity: number;
}

export default function AdminItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState<Item | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image_url: "",
    stock_quantity: 0,
    category_id: 0,
  });

  // Fetch categories for select
  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("id, name").order("name");
    if (!error) setCategories(data || []);
  };

  // Fetch items
  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("items").select("id, created_at, category_id, name, description, image_url, stock_quantity").order("created_at", { ascending: false });
    if (!error) setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, []);

  // Create
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("items").insert([{ ...form }]);
    if (!error) {
      toast({ title: "Item Added" });
      setShowCreate(false);
      setForm({ name: "", description: "", image_url: "", stock_quantity: 0, category_id: 0 });
      fetchItems();
    } else {
      toast({ title: "Error", description: error.message });
    }
    setLoading(false);
  };

  // Update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setLoading(true);
    const { error } = await supabase.from("items").update({ ...form }).eq("id", selected.id);
    if (!error) {
      toast({ title: "Item Updated" });
      setShowEdit(false);
      setSelected(null);
      setForm({ name: "", description: "", image_url: "", stock_quantity: 0, category_id: 0 });
      fetchItems();
    } else {
      toast({ title: "Error", description: error.message });
    }
    setLoading(false);
  };

  // Delete
  const handleDelete = async () => {
    if (!selected) return;
    setLoading(true);
    const { error } = await supabase.from("items").delete().eq("id", selected.id);
    if (!error) {
      toast({ title: "Item Deleted" });
      setShowDelete(false);
      setSelected(null);
      fetchItems();
    } else {
      toast({ title: "Error", description: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-900 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Items</h1>
          <Button onClick={() => setShowCreate(true)} className="flex items-center gap-2"><Plus className="w-4 h-4" /> Add Item</Button>
        </div>
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="flex items-center justify-between p-4 bg-white/60 dark:bg-black/40 border-amber-500/20">
              <div>
                <div className="font-semibold text-lg text-slate-800 dark:text-white">{item.name}</div>
                <div className="text-slate-500 dark:text-gray-300 text-xs">ID: {item.id} | Category: {categories.find(c => c.id === item.category_id)?.name || "-"} | Stock: {item.stock_quantity}</div>
                <div className="text-slate-500 dark:text-gray-300 text-xs">{item.description}</div>
                {item.image_url && <img src={item.image_url} alt={item.name} className="mt-2 rounded w-32 h-20 object-cover border" />}
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => { setSelected(item); setForm({ name: item.name, description: item.description, image_url: item.image_url, stock_quantity: item.stock_quantity, category_id: item.category_id }); setShowEdit(true); }}><Edit className="w-5 h-5" /></Button>
                <Button size="icon" variant="ghost" onClick={() => { setSelected(item); setShowDelete(true); }}><Trash2 className="w-5 h-5 text-red-500" /></Button>
              </div>
            </Card>
          ))}
          {items.length === 0 && <div className="text-center text-slate-500">No items found.</div>}
        </div>
      </div>

      {/* Create Modal */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <Input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            <Input placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
            <Input placeholder="Image URL" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} />
            <Input placeholder="Stock Quantity" type="number" value={form.stock_quantity} onChange={e => setForm(f => ({ ...f, stock_quantity: Number(e.target.value) }))} required />
            <select value={form.category_id} onChange={e => setForm(f => ({ ...f, category_id: Number(e.target.value) }))} required className="w-full p-2 rounded border border-amber-500/30 bg-white/50 dark:bg-white/10 text-slate-800 dark:text-white">
              <option value="">Select Category</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            <DialogFooter>
              <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add"}</Button>
              <DialogClose asChild>
                <Button type="button" variant="ghost">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <Input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            <Input placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
            <Input placeholder="Image URL" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} />
            <Input placeholder="Stock Quantity" type="number" value={form.stock_quantity} onChange={e => setForm(f => ({ ...f, stock_quantity: Number(e.target.value) }))} required />
            <select value={form.category_id} onChange={e => setForm(f => ({ ...f, category_id: Number(e.target.value) }))} required className="w-full p-2 rounded border border-amber-500/30 bg-white/50 dark:bg-white/10 text-slate-800 dark:text-white">
              <option value="">Select Category</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            <DialogFooter>
              <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
              <DialogClose asChild>
                <Button type="button" variant="ghost">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
          </DialogHeader>
          <div className="mb-4">Are you sure you want to delete <span className="font-semibold">{selected?.name}</span>?</div>
          <DialogFooter>
            <Button onClick={handleDelete} disabled={loading} variant="destructive">{loading ? "Deleting..." : "Delete"}</Button>
            <DialogClose asChild>
              <Button type="button" variant="ghost">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
