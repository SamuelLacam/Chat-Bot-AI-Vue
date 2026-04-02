// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@pinia/nuxt"],
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

  runtimeConfig: {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    jwtKey: process.env.JWT_KEY,
    openRouterApiKey: process.env.OPEN_ROUTER_API_KEY,
  },
});
