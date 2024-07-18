export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "shadcn-nuxt"],
  colorMode: {
    classSuffix: "",
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  // workaround for Nuxt bug, see https://github.com/nuxt/nuxt/issues/27558#issuecomment-2166231479
  hooks: {
    "vite:extendConfig": (config) => {
      if (typeof config.server!.hmr === "object") {
        config.server!.hmr.protocol = "wss";
      }
    },
  },
});
