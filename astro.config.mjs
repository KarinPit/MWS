import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 3000
  },
  output: 'server',
  adapter: node({
    mode: "middleware"
  })
});