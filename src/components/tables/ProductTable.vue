<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";
import draggable from "vuedraggable";
import ProductRow from "./ProductRow.vue";
import type { Product } from "../../types/product";

const props = defineProps<{ products: Product[] }>();
const emit = defineEmits(["sort", "edit"]);

const localProducts = ref([...props.products]);

watch(
  () => props.products,
  (newProducts) => {
    localProducts.value = [...newProducts];
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex flex-col bg-white">
    <div class="flex-grow">
      <table class="relative w-full">
        <thead
          class="text-xs font-bold uppercase bg-white shadow sticky top-0 z-0"
        >
          <tr>
            <th class="sticky top-0 w-10 px-4 py-3"></th>
            <th class="sticky top-0 px-4 py-3 text-left hidden sm:table-cell">
              Produkt ID
            </th>
            <th class="sticky top-0 px-4 py-3 text-left">Navn</th>
            <th class="sticky top-0 px-4 py-3 text-left hidden sm:table-cell">
              Beskrivelse
            </th>
            <th class="sticky top-0 px-4 py-3 text-left">Pris</th>
            <th class="sticky top-0 px-4 py-3 text-left hidden sm:table-cell">
              Momstats
            </th>
            <th class="sticky top-0 px-4 py-3 text-left hidden sm:table-cell">
              Tag
            </th>
            <th class="sticky top-0 w-10 px-4 py-3"></th>
          </tr>
        </thead>

        <draggable
          tag="tbody"
          v-model="localProducts"
          @end="emit('sort', localProducts)"
          item-key="id"
          handle=".drag-handle"
        >
          <template #item="{ element }">
            <ProductRow :product="element" @edit="emit('edit', $event)" />
          </template>
        </draggable>
      </table>
    </div>
  </div>
</template>
