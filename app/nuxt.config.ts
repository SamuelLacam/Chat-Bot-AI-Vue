// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  // modules: ["@nuxt/eslint", "@pinia/nuxt"],
  modules: ["@pinia/nuxt", "@nuxt/eslint"],
  // ssr: false,
  routeRules: {
    // "/": { redirect: "/new" },
  },

  // vue: {
  //   compilerOptions: {
  //     isCustomElement: (tag) => tag === "ellipsis-btn",
  //   },
  // },
  // typescript: {
  //   tsConfig: {
  //     include: ["../types/app.d.ts"],
  //   },
  // },
  // nitro: {
  //   typescript: {
  //     tsConfig: {
  //       include: ["../types/**/*.d.ts"],
  //     },
  //   },
  // },

  // env var prefixed by 'NUXT_' so the env var is set up at runtime (not in build time)
  runtimeConfig: {
    dbHost: "",
    dbPort: "",
    dbName: "",
    dbUser: "",
    dbPassword: "",
    jwtKey: "",
    openRouterApiKey: "",
    openRouterLlmId: "",
  },
  // runtimeConfig: {
  //   dbHost: process.env.DB_HOST,
  //   dbPort: process.env.DB_PORT,
  //   dbName: process.env.DB_NAME,
  //   dbUser: process.env.DB_USER,
  //   dbPassword: process.env.DB_PASSWORD,
  //   jwtKey: process.env.JWT_KEY,
  //   openRouterApiKey: process.env.OPEN_ROUTER_API_KEY,
  //   openRouterLlmId: process.env.OPEN_ROUTER_LLM_ID,
  // },
});
