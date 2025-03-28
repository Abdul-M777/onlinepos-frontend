export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  vat: number;
  tag_name: string | null;
  tag_color: string | null;
  sort_order: number;
}
