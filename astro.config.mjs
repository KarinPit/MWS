import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000, // Use the value of process.env.PORT if available, or default to 3000
  },
});