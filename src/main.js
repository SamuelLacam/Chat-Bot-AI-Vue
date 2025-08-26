import "./assets/main.css";

import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
// import clickOutside from "./directives/clickOutside.js";
import router from "./router";

const app = createApp(App);
// app.directive("clickOutside", clickOutside);
app.use(createPinia());
app.use(router);

app.mount("#app");
