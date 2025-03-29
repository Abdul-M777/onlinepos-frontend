import { createRouter, createWebHistory } from "vue-router";
import ProductDetails from "../pages/ProductDetails.vue";

const routes = [{ path: "/", component: ProductDetails }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
