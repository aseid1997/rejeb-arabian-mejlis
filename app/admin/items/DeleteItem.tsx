import { Button } from "@/components/ui/button";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Item } from "./types";

interface DeleteItemProps {
  item: Item;
  loading: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeleteItem({ item, loading, onDelete, onCancel }: DeleteItemProps) {
  return (
    <div>
      <div className="mb-4">Are you sure you want to delete <span className="font-semibold">{item.name}</span>?</div>
      <DialogFooter>
        <Button onClick={onDelete} disabled={loading} variant="destructive">{loading ? "Deleting..." : "Delete"}</Button>
        <DialogClose asChild>
          <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
}
