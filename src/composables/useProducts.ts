import { ref } from "vue";
import axios from "axios";
import type { Product } from "../types/product";

const API_URL = "http://localhost:8000/api/products";

export function useProducts() {
  const products = ref<Product[]>([]);
  const product = ref<Product>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    vat: 0,
    tag_name: "",
    tag_color: "",
    sort_order: 0,
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(API_URL);
      products.value = response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const updateSortOrder = async (sortedProducts: Product[]) => {
    try {
      products.value = [...sortedProducts];
      await axios.post(`${API_URL}/sort`, { products: products.value });
    } catch (error) {
      console.error("Error updating sort order:", error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    }
  };

  // Save or update a product
  const saveProduct = async () => {
    try {
      if (product.value?.id) {
        await axios.put(`${API_URL}/${product.value.id}`, product.value);
      } else {
        // If no ID, create a new product
        await axios.post(API_URL, product.value);
      }
      return true;
    } catch (error) {
      console.error("Error saving product:", error);
      return false;
    }
  };

  return {
    products,
    product,
    fetchProducts,
    updateSortOrder,
    deleteProduct,
    saveProduct,
  };
}
