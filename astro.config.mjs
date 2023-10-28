import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  server: {
    host: '0.0.0.0', // Bind to all available network interfaces
    port: 3000, // Use port 3000
  },
});