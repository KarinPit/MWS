import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  server: {
    port: parseInt(process.env.PORT, 10) || 3000, // Parse the value from the PORT environment variable as a number
  },
});