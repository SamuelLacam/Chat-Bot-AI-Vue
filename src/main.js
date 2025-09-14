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

// API KEY
// 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
