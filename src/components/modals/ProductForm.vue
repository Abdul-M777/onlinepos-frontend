<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, computed } from "vue";
import axios from "axios";
import { useMotion } from "@vueuse/motion";

const props = defineProps<{ product: any }>();
const emit = defineEmits(["close", "refresh"]);

const API_URL = "http://localhost:8000/api/products";

const product = ref({
  name: "",
  description: "",
  price: 0,
  vat: 25,
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
          vat: 25,
          tag_name: "",
          tag_color: "",
        };
  },
  { immediate: true }
);

const isFormValid = computed(() => {
  return (
    product.value.name.trim() !== "" &&
    product.value.price > 0 &&
    product.value.vat > 0
  );
});

const saveProduct = async () => {
  if (props.product?.id) {
    await axios.put(`${API_URL}/${props.product.id}`, product.value);
  } else {
    await axios.post(API_URL, product.value);
  }
  emit("refresh");
  // emit("close");
  closeModal();
};

const isVisible = ref(true);

const modalRef = ref(null);
useMotion(modalRef, {
  initial: { opacity: 0, scale: 0.8 },
  enter: { opacity: 1, scale: 1, transition: { duration: 300 } },
  leave: { opacity: 0, scale: 0.8, transition: { duration: 200 } },
});

const closeModal = () => {
  isVisible.value = false;
  setTimeout(() => emit("close"), 200);
};
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
    <div
      ref="modalRef"
      class="bg-white p-4 md:p-6 rounded shadow-lg w-full max-w-md max-h-screen overflow-y-auto"
    >
      <div
        class="flex justify-between items-center border-b border-gray-200 pb-2"
      >
        <h2 class="text-lg font-bold">
          {{ props.product?.id ? "Rediger" : "Opret" }} Produkt
        </h2>
        <button
          type="button"
          class="text-gray-400 hover:text-gray-600"
          @click="emit('close')"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 14 14">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>

      <div class="grid gap-4 mt-4">
        <label for="name">Navn<span class="text-red-500">*</span></label>
        <input
          v-model="product.name"
          class="p-2 border border-gray-400 rounded outline-none focus:ring focus:ring-green-500"
          name="name"
          id="name"
        />
        <label for="description">Beskrivelse</label>
        <textarea
          v-model="product.description"
          class="p-2 border border-gray-400 rounded outline-none focus:ring focus:ring-green-500"
          id="description"
        ></textarea>
        <label for="pris">Pris<span class="text-red-500">*</span></label>
        <input
          type="number"
          v-model="product.price"
          class="p-2 border border-gray-400 rounded outline-none focus:ring focus:ring-green-500"
          id="pris"
        />
        <label for="vatrate">Momstats<span class="text-red-500">*</span></label>
        <input
          type="number"
          v-model="product.vat"
          class="p-2 border border-gray-400 rounded outline-none focus:ring focus:ring-green-500"
          id="vatrate"
        />
        <label for="tagname">Tagnavn</label>
        <input
          v-model="product.tag_name"
          class="p-2 border border-gray-400 rounded outline-none focus:ring focus:ring-green-500"
          id="tagname"
        />
        <label for="tagcolor">Tagfarve</label>
        <input
          v-model="product.tag_color"
          class="p-2 border border-gray-400 rounded outline-none focus:ring focus:ring-green-500"
          id="tagcolor"
        />
        <div class="flex justify-between gap-2 mt-4">
          <button
            v-if="props.product?.id"
            class="bg-red-500 text-white px-4 py-2 rounded"
          >
            Slet
          </button>

          <div class="flex gap-2 ml-auto">
            <button
              @click="closeModal()"
              class="bg-gray-200 text-gray-700 px-4 py-2 rounded"
            >
              Annuller
            </button>
            <button
              @click="saveProduct"
              :disabled="!isFormValid"
              :class="
                isFormValid
                  ? 'bg-green-600 text-white px-4 py-2 rounded'
                  : 'bg-green-200 text-white px-4 py-2 rounded cursor-not-allowed'
              "
            >
              {{ props.product?.id ? "Gem" : "Opret" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
