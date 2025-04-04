import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      components: "/src/components",
      layouts: "/src/layouts",
      pages: "/src/pages",
      types: "/src/types",
    },
  },
});
