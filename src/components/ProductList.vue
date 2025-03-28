<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import draggable from "vuedraggable";
import ProductForm from "./modals/ProductForm.vue";
import { getColor, getDarkerColor } from "../utils/colorMap";
import { formatPrice } from "../utils/format";

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
        class="bg-emerald-500 text-white px-2 py-1 rounded hover:bg-emerald-600 transition duration-200 flex items-center cursor-pointer"
      >
        <i class="pi pi-plus"></i> <span class="py-1 mx-1">Opret produkt</span>
      </button>
    </div>

    <div
      class="relative overflow-x-auto rounded-lg shadow-lg bg-white h-[900px] flex flex-col"
    >
      <div class="p-4 text-gray-700 font-semibold">
        Alle produkter ({{ products.length }})
      </div>

      <div class="flex-1 overflow-y-auto">
        <table class="w-full text-sm text-gray-700 h-full">
          <thead
            class="text-xs font-bold uppercase bg-white shadow sticky top-0 z-10"
          >
            <tr>
              <th class="w-10 px-4 py-3"></th>
              <th class="px-4 py-3 text-left hidden sm:table-cell">
                Produkt ID
              </th>
              <th class="px-4 py-3 text-left">Navn</th>
              <th class="px-4 py-3 text-left hidden sm:table-cell">
                Beskrivelse
              </th>
              <th class="px-4 py-3 text-left">Pris</th>
              <th class="px-4 py-3 text-left hidden sm:table-cell">Momstats</th>
              <th class="px-4 py-3 text-left hidden sm:table-cell">Tag</th>
              <th class="w-10 px-4 py-3"></th>
            </tr>
          </thead>

          <draggable
            tag="tbody"
            v-model="products"
            @end="updateSortOrder"
            item-key="id"
          >
            <template #item="{ element }">
              <tr
                class="border-b border-gray-200 odd:bg-gray-50 hover:bg-gray-100 transition"
              >
                <!-- Drag handle -->
                <td class="px-4 py-4 text-gray-500 cursor-move">
                  <i class="pi pi-align-justify"></i>
                </td>

                <td
                  class="px-4 py-4 font-medium text-gray-900 hidden sm:table-cell"
                >
                  {{ element.id }}
                </td>
                <td class="px-4 py-4">{{ element.name }}</td>
                <td class="px-4 py-4 max-w-xs hidden sm:table-cell">
                  {{ element.description }}
                </td>
                <td class="px-4 py-4 text-right">
                  {{ formatPrice(element.price) }}
                </td>
                <td class="px-4 py-4 hidden sm:table-cell">
                  {{ Math.floor(element.vat) }} %
                </td>
                <td class="px-4 py-4 hidden sm:table-cell">
                  <span
                    class="px-2 py-1 rounded-full text-xs text-white font-semibold"
                    :style="{
                      backgroundColor: element.tag_name
                        ? getColor(element.tag_color)
                        : 'transparent',
                      color: element.tag_name
                        ? getDarkerColor(getColor(element.tag_color))
                        : 'transparent',
                    }"
                  >
                    {{ element.tag_name }}
                  </span>
                </td>

                <td class="px-4 py-4 text-right">
                  <button
                    @click="openModal(element)"
                    class=":hover:bg-gray-200 cursor-pointer"
                  >
                    <i class="pi pi-angle-right"></i>
                  </button>
                </td>
              </tr>
            </template>
          </draggable>
        </table>
      </div>
    </div>

    <ProductForm
      v-if="showModal"
      :product="selectedProduct"
      @close="showModal = false"
      @refresh="fetchProducts"
    />
  </div>
</template>
