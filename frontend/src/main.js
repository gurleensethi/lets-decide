import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./assets/tailwind.css";
import VueRouter from "vue-router";
import router from "./router";

createApp(App).use(router).use(VueRouter).use(store).mount("#app");
