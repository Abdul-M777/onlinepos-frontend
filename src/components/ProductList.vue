<script setup lang="ts">
import { ref, onMounted } from "vue";
import ProductTable from "./tables/ProductTable.vue";
import ProductForm from "./modals/ProductForm.vue";
import { useProducts } from "../composables/useProducts";
import type { Product } from "../types/product";

const showModal = ref<boolean>(false);
const selectedProduct = ref<Product | null>(null);
const { products, fetchProducts, updateSortOrder } = useProducts();
const modalRef = ref<{ focusInput: () => void } | null>(null);

const openModal = (product: Product | null = null) => {
  selectedProduct.value = product;
  showModal.value = true;
  setTimeout(() => {
    modalRef.value?.focusInput();
  }, 10);
};

onMounted(fetchProducts);
</script>

<template>
  <div class="p-6">
    <h1 class="mb-4 text-gray-600 text-lg not-italic">Salgsprodukter</h1>
    <div class="flex justify-end mb-4">
      <button
        @click="openModal()"
        class="bg-emerald-500 text-white px-2 py-1 rounded hover:bg-emerald-600 transition"
      >
        <i class="pi pi-plus"></i> <span class="py-1 mx-1">Opret produkt</span>
      </button>
    </div>

    <div class="p-4 text-gray-700 font-semibold bg-white">
      Alle produkter ({{ products.length }})
    </div>

    <ProductTable
      :products="products"
      @sort="updateSortOrder"
      @edit="openModal"
    />

    <ProductForm
      v-if="showModal"
      :product="selectedProduct"
      @close="showModal = false"
      @refresh="fetchProducts"
      ref="modalRef"
    />
  </div>
</template>
