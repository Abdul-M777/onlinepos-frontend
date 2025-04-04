import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.mount("#app");
