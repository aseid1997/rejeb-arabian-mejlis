"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { CategoriesTable } from "@/components/categories/CategoriesTable";
import { Sidebar } from "@/components/admin/Sidebar";

interface Category {
  id: number;
  created_at: string;
  name: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: "" });

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("categories").select("id, created_at, name").order("created_at", { ascending: false });
    if (!error) setCategories(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  // Create
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("categories").insert([{ name: form.name }]);
    if (!error) {
      toast({ title: "Category Added" });
      setShowCreate(false);
      setForm({ name: "" });
      fetchCategories();
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
    const { error } = await supabase.from("categories").update({ name: form.name }).eq("id", selected.id);
    if (!error) {
      toast({ title: "Category Updated" });
      setShowEdit(false);
      setSelected(null);
      setForm({ name: "" });
      fetchCategories();
    } else {
      toast({ title: "Error", description: error.message });
    }
    setLoading(false);
  };

  // Delete
  const handleDelete = async () => {
    if (!selected) return;
    setLoading(true);
    const { error } = await supabase.from("categories").delete().eq("id", selected.id);
    if (!error) {
      toast({ title: "Category Deleted" });
      setShowDelete(false);
      setSelected(null);
      fetchCategories();
    } else {
      toast({ title: "Error", description: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-purple-500 to-amber-700 drop-shadow-lg">Categories</h1>
              <Button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"><Plus className="w-4 h-4" /> Add Category</Button>
            </div>
            <div className="rounded-2xl shadow-2xl bg-white/80 dark:bg-black/40 p-6 border border-amber-200 dark:border-amber-900">
              <CategoriesTable
                categories={categories}
                onEdit={cat => { setSelected(cat); setForm({ name: cat.name }); setShowEdit(true); }}
                onDelete={cat => { setSelected(cat); setShowDelete(true); }}
                loading={loading}
              />
            </div>
          </div>
        </div>

          {/* Create Modal */}
          <Dialog open={showCreate} onOpenChange={setShowCreate}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <Input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
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
                <DialogTitle>Edit Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpdate} className="space-y-4">
                <Input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
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
                <DialogTitle>Delete Category</DialogTitle>
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
      </main>
    </div>
  );
}
