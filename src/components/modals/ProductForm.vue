<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, computed, nextTick } from "vue";
import { useMotion } from "@vueuse/motion";
import { useProducts } from "../../composables/useProducts";

const props = defineProps<{ product: any }>();
const emit = defineEmits(["close", "refresh"]);

const { product, saveProduct, deleteProduct } = useProducts();

const inputRef = ref<HTMLInputElement | null>(null);

const focusInput = () => {
  nextTick(() => {
    inputRef.value?.focus();
  });
};

defineExpose({ focusInput });

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
    product.value?.name?.trim() !== "" &&
    product.value?.price > 0 &&
    product.value?.vat > 0
  );
});

const hasChanges = computed(() => {
  return JSON.stringify(product.value) !== JSON.stringify(props.product);
});

const isVisible = ref(true);

const modalRef = ref(null);
useMotion(modalRef, {
  initial: { opacity: 0, scale: 0.8 },
  enter: { opacity: 1, scale: 1, transition: { duration: 300 } },
  leave: { opacity: 0, scale: 0.8, transition: { duration: 200 } },
});

const closeModal = () => {
  isVisible.value = false;
  setTimeout(() => emit("close"));
};

const handleSave = async () => {
  const success = await saveProduct();
  console.log("success", success);
  if (success) {
    emit("refresh");
    closeModal();
  }
};

const handleDelete = async () => {
  const success = await deleteProduct(props.product.id);
  if (success) {
    emit("refresh");
    closeModal();
  }
};
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black/50 p-2 sm:p-4"
  >
    <div
      ref="modalRef"
      class="bg-white p-3 sm:p-4 md:p-6 rounded shadow-lg w-full max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto"
    >
      <div
        class="flex justify-between items-center border-b border-gray-200 pb-2"
      >
        <h2 class="text-base sm:text-lg font-semibold">
          {{ props.product?.id ? "Rediger" : "Opret" }} Produkt
        </h2>
        <button
          type="button"
          class="text-gray-400 hover:text-gray-600"
          @click="closeModal()"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 14 14">
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

      <div class="grid gap-3 sm:gap-4 mt-3 sm:mt-4">
        <label for="name" class="text-sm sm:text-base"
          >Navn<span class="text-red-500">*</span></label
        >
        <input
          v-model="product.name"
          class="p-2 border border-gray-400 rounded outline-none focus:ring focus:ring-green-500 text-sm"
          name="name"
          id="name"
          ref="inputRef"
        />

        <label for="description" class="text-sm sm:text-base"
          >Beskrivelse</label
        >
        <textarea
          v-model="product.description"
          class="p-2 border border-gray-400 rounded outline-none focus:ring focus:ring-green-500 text-sm"
          id="description"
        ></textarea>

        <label for="pris" class="text-sm sm:text-base"
          >Pris<span class="text-red-500">*</span></label
        >
        <input
          type="number"
          v-model="product.price"
          class="p-2 border border-gray-400 rounded outline-none focus:ring focus:ring-green-500 text-sm"
          id="pris"
        />

        <label for="vatrate" class="text-sm sm:text-base"
          >Momstats<span class="text-red-500">*</span></label
        >
        <input
          type="number"
          v-model="product.vat"
          class="p-2 border border-gray-400 rounded outline-none focus:ring focus:ring-green-500 text-sm"
          id="vatrate"
        />

        <label for="tagname" class="text-sm sm:text-base">Tagnavn</label>
        <input
          v-model="product.tag_name"
          class="p-2 border border-gray-400 rounded outline-none focus:ring focus:ring-green-500 text-sm"
          id="tagname"
        />

        <label for="tagcolor" class="text-sm sm:text-base">Tagfarve</label>
        <input
          v-model="product.tag_color"
          class="p-2 border border-gray-400 rounded outline-none focus:ring focus:ring-green-500 text-sm"
          id="tagcolor"
        />

        <div class="flex sm:flex-row justify-between gap-2 mt-3 sm:mt-4">
          <div class="flex gap-2 w-fit justify-start mr-auto">
            <button
              v-if="props.product?.id"
              @click="handleDelete()"
              class="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600 transition duration-200 text-sm"
            >
              Slet
            </button>
          </div>

          <div class="flex gap-2 ml-auto w-fit">
            <button
              @click="closeModal()"
              class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition duration-200 cursor-pointer text-sm"
            >
              Annuller
            </button>
            <button
              @click="handleSave()"
              :disabled="!isFormValid || !hasChanges"
              :class="
                isFormValid && hasChanges
                  ? 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200 cursor-pointer text-sm'
                  : 'bg-green-200 text-white px-4 py-2 rounded cursor-not-allowed text-sm'
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
