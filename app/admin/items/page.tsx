"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { ItemsTable } from "@/components/items/ItemsTable";
import { AddItemForm } from "@/components/items/AddItemForm";
import { EditItemForm } from "@/components/items/EditItemForm";
import { DeleteItem } from "@/components/items/DeleteItem";
import type { Item, Category } from "@/components/items/types";
import { Sidebar } from "@/components/admin/Sidebar";

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState<Item | null>(null);

  // Fetch categories for select
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("id, name").order("name");
      if (error) throw error;
      setCategories(data || []);
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to fetch categories" });
    }
  };

  // Fetch items
  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("items").select("id, created_at, category_id, name, description, image_url, stock_quantity").order("created_at", { ascending: false });
      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to fetch items" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, []);

  // Create
  const handleCreate = async (form: Omit<Item, "id" | "created_at">) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("items").insert([{ ...form }]);
      if (error) throw error;
      toast({ title: "Item Added" });
      setShowCreate(false);
      fetchItems();
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to add item" });
    }
    setLoading(false);
  };

  // Update
  const handleUpdate = async (form: Omit<Item, "id" | "created_at">) => {
    if (!selected) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("items").update({ ...form }).eq("id", selected.id);
      if (error) throw error;
      toast({ title: "Item Updated" });
      setShowEdit(false);
      setSelected(null);
      fetchItems();
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to update item" });
    }
    setLoading(false);
  };

  // Delete
  const handleDelete = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("items").delete().eq("id", selected.id);
      if (error) throw error;
      toast({ title: "Item Deleted" });
      setShowDelete(false);
      setSelected(null);
      fetchItems();
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to delete item" });
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-amber-500 to-purple-700 drop-shadow-lg">Items</h1>
              <Button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-amber-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"><Plus className="w-4 h-4" /> Add Item</Button>
            </div>
            <div className="rounded-2xl shadow-2xl bg-white/80 dark:bg-black/40 p-6 border border-purple-200 dark:border-purple-900">
              <ItemsTable
                items={items}
                categories={categories}
                onEdit={item => { setSelected(item); setShowEdit(true); }}
                onDelete={item => { setSelected(item); setShowDelete(true); }}
                loading={loading}
              />
            </div>
          </div>
        </div>

        {/* Create Modal */}
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Item</DialogTitle>
            </DialogHeader>
            <AddItemForm
              categories={categories}
              loading={loading}
              onSubmit={handleCreate}
              onCancel={() => setShowCreate(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Modal */}
        <Dialog open={showEdit} onOpenChange={setShowEdit}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Item</DialogTitle>
            </DialogHeader>
            {selected && (
              <EditItemForm
                item={selected}
                categories={categories}
                loading={loading}
                onSubmit={handleUpdate}
                onCancel={() => { setShowEdit(false); setSelected(null); }}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Modal */}
        <Dialog open={showDelete} onOpenChange={setShowDelete}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Item</DialogTitle>
            </DialogHeader>
            {selected && (
              <DeleteItem
                item={selected}
                loading={loading}
                onDelete={handleDelete}
                onCancel={() => { setShowDelete(false); setSelected(null); }}
              />
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
