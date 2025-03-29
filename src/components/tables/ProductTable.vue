<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import draggable from "vuedraggable";
import ProductRow from "./ProductRow.vue";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  vat: number;
  tag_name?: string;
  tag_color?: string;
}

const props = defineProps<{ products: Product[] }>();
const emit = defineEmits(["sort", "edit"]);
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
          v-model="props.products"
          @end="emit('sort')"
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
