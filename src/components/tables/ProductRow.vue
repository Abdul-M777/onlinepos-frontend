<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { formatPrice } from "../../utils/format";
import { getColor, getDarkerColor } from "../../utils/colorMap";
import type { Product } from "../../types/product";

const props = defineProps<{ product: Product }>();
const emit = defineEmits(["edit"]);
</script>

<template>
  <tr
    class="border-b border-gray-200 odd:bg-gray-50 hover:bg-gray-100 transition"
  >
    <td class="px-4 py-4 text-gray-500 cursor-move drag-handle">
      <i class="pi pi-align-justify"></i>
    </td>

    <td class="px-4 py-4 font-medium text-gray-900 hidden sm:table-cell">
      {{ props.product.id }}
    </td>
    <td class="px-4 py-4">{{ props.product.name }}</td>
    <td class="px-4 py-4 max-w-xs hidden sm:table-cell">
      {{ props.product.description }}
    </td>
    <td class="px-4 py-4 text-right">
      {{ formatPrice(props.product.price) }}
    </td>
    <td class="px-4 py-4 hidden sm:table-cell">
      {{ Math.floor(props.product.vat) }} %
    </td>
    <td class="px-4 py-4 hidden sm:table-cell">
      <span
        class="px-2 py-1 rounded-full text-xs text-white font-semibold"
        :style="{
          backgroundColor: product.tag_name
            ? getColor(props.product.tag_color) || 'transparent'
            : 'transparent',
          color: product.tag_name
            ? getDarkerColor(getColor(props.product.tag_color) || 'transparent')
            : 'transparent',
        }"
      >
        {{ props.product.tag_name }}
      </span>
    </td>

    <td class="px-4 py-4 text-right">
      <button
        @click="emit('edit', product)"
        class="hover:bg-gray-200 cursor-pointer"
      >
        <i class="pi pi-angle-right"></i>
      </button>
    </td>
  </tr>
</template>
