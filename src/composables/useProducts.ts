import { ref, defineEmits } from "vue";
import axios from "axios";
import type { Product } from "@/types/product";

const API_URL = "http://localhost:8000/api/products";

export function useProducts() {
  const products = ref<Product[]>([]);
  const product = ref<Product | null>(null); // Product to be edited
  const emit = defineEmits(["close", "refresh"]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(API_URL);
      products.value = response.data;
      console.log("Fetched products:", products.value);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const updateSortOrder = async () => {
    try {
      await axios.post(`${API_URL}/sort`, { products: products.value });
    } catch (error) {
      console.error("Error updating sort order:", error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Save or update a product
  const saveProduct = async () => {
    try {
      console.log(product.value);
      if (product.value?.id) {
        // If product has an ID, update the existing product
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
