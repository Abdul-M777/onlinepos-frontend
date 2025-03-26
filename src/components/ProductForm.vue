<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";
import axios from "axios";

const props = defineProps<{ product: any }>();
const emit = defineEmits(["close", "refresh"]);

const API_URL = "http://localhost:8000/api/products";

const product = ref({
  name: "",
  description: "",
  price: 0,
  vat_rate: 25,
  tag_name: "",
  tag_color: "",
});

watch(
  () => props.product,
  (newProduct) => {
    product.value = newProduct
      ? { ...newProduct }
      : {
          name: "",
          description: "",
          price: 0,
          vat_rate: 25,
          tag_name: "",
          tag_color: "",
        };
  },
  { immediate: true }
);

const saveProduct = async () => {
  if (props.product?.id) {
    await axios.put(`${API_URL}/${props.product.id}`, product.value);
  } else {
    await axios.post(API_URL, product.value);
  }
  emit("refresh");
  emit("close");
};
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded shadow-lg w-96">
      <h2 class="text-lg font-bold mb-4">
        {{ props.product?.id ? "Edit" : "New" }} Product
      </h2>

      <div class="grid gap-4">
        <input
          v-model="product.name"
          placeholder="Name"
          class="p-2 border rounded"
        />
        <textarea
          v-model="product.description"
          placeholder="Description"
          class="p-2 border rounded"
        ></textarea>
        <input
          type="number"
          v-model="product.price"
          placeholder="Price"
          class="p-2 border rounded"
        />
        <input
          type="number"
          v-model="product.vat_rate"
          placeholder="VAT Rate"
          class="p-2 border rounded"
        />
        <input
          v-model="product.tag_name"
          placeholder="Tag Name"
          class="p-2 border rounded"
        />
        <input
          type="color"
          v-model="product.tag_color"
          class="p-2 border rounded"
        />
        <div class="flex justify-end gap-2">
          <button
            @click="emit('close')"
            class="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            @click="saveProduct"
            class="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
