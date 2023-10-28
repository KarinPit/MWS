import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 3000,
  },
});