// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt()
  .override("nuxt/vue/rules", {
    rules: {
      "vue/html-self-closing": ["warn", { html: { void: "any" } }],
    },
  })
  .override("nuxt/typescript/rules", {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  });
