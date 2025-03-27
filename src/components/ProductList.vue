<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import draggable from "vuedraggable";
import ProductForm from "./modals/ProductForm.vue";

interface Product {
  id: number;
  name: string;
  price: number;
}

const products = ref<Product[]>([]);
const showModal = ref<boolean>(false);
const selectedProduct = ref<Product | null>(null);

const API_URL = "http://localhost:8000/api/products";

const fetchProducts = async () => {
  try {
    const response = await axios.get<Product[]>(API_URL);
    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
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

const updateSortOrder = async () => {
  try {
    await axios.post(`${API_URL}/sort`, { products: products.value });
  } catch (error) {
    console.error("Error updating sort order:", error);
  }
};

const openModal = (product: Product | null = null) => {
  selectedProduct.value = product;
  showModal.value = true;
};

onMounted(fetchProducts);
</script>

<template>
  <div class="p-6">
    <h1 class="mb-4 text-gray-600 text-lg not-italic">Salgsprodukter</h1>
    <div class="flex justify-end mb-4">
      <button
        @click="openModal()"
        class="bg-emerald-500 text-white px-2 py-1 rounded"
      >
        <i class="pi pi-plus"></i> <span class="py-1 mx-1">Opret produkt</span>
      </button>
    </div>

    <div class="relative overflow-x-auto rounded shadow-2xl px-2 bg-gray-50">
      <div class="p-3 text-gray-500">Alle produkter(3)</div>
      <table class="text-sm text-left rtl:text-right text-gray-500 w-full">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr class="bg-white border-b border-gray-200">
            <th scope="col" class=""></th>
            <th scope="col" class="py-3">Produkt ID</th>
            <th scope="col" class="py-3">Navn</th>
            <th scope="col" class="py-3">Beskrivelse</th>
            <th scope="col" class="py-3">Pris</th>
            <th scope="col" class="py-3">Momstats</th>
            <th scope="col" class="py-3">Tag</th>
            <th scope="col" class=""></th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b border-gray-200">
            <td class="py-4 px-4"><i class="pi pi-align-justify"></i></td>
            <td scope="row" class="px-4 py-4 text-gray-900 whitespace-nowrap">
              Apple MacBook Pro 17"
            </td>
            <td class="px-4 py-4">Silver</td>
            <td class="px-4 py-4">Laptop</td>
            <td class="px-4 py-4">$2999</td>
            <td class="px-4 py-4">Laptop</td>
            <td class="px-4 py-4">$2999</td>
            <td class="py-4 px-4"><i class="pi pi-angle-right"></i></td>
          </tr>
          <tr class="bg-white border-b border-gray-200">
            <td class="py-4 px-4"><i class="pi pi-align-justify"></i></td>
            <td scope="row" class="px-4 py-4 text-gray-900 whitespace-nowrap">
              Microsoft Surface Pro
            </td>
            <td class="px-4 py-4">White</td>
            <td class="px-4 py-4">Laptop PC</td>
            <td class="px-4 py-4">$1999</td>
            <td class="px-4 py-4">Laptop</td>
            <td class="px-4 py-4">$2999</td>
            <td class="py-4 px-4"><i class="pi pi-angle-right"></i></td>
          </tr>
          <tr class="bg-white">
            <td class="py-4 px-4"><i class="pi pi-align-justify"></i></td>
            <td scope="row" class="px-4 py-4 text-gray-900 whitespace-nowrap">
              Magic Mouse 2
            </td>
            <td class="px-4 py-4">Black</td>
            <td class="px-4 py-4">Accessories</td>
            <td class="px-4 py-4">$99</td>
            <td class="px-4 py-4">Laptop</td>
            <td class="px-4 py-4">$2999</td>
            <td class="py-4 px-4"><i class="pi pi-angle-right"></i></td>
          </tr>
        </tbody>
      </table>
    </div>

    <draggable v-model="products" @end="updateSortOrder" item-key="id">
      <template #item="{ element }">
        <div class="flex justify-between items-center p-4 border rounded mb-2">
          <span>{{ element.name }} - {{ element.price }} DKK</span>
          <div>
            <button @click="openModal(element)" class="text-blue-500">
              Edit
            </button>
            <button
              @click="deleteProduct(element.id)"
              class="text-red-500 ml-4"
            >
              Delete
            </button>
          </div>
        </div>
      </template>
    </draggable>

    <ProductForm
      v-if="showModal"
      :product="selectedProduct"
      @close="showModal = false"
      @refresh="fetchProducts"
    />
  </div>
</template>
