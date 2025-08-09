export interface Category {
  id: number;
  name: string;
}

export interface Item {
  id: number;
  created_at: string;
  category_id: number;
  name: string;
  description: string;
  image_url: string;
  stock_quantity: number;
}
