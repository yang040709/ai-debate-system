import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
// import { TDesignResolver } from 'unplugin-vue-components/resolvers';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
    AutoImport({
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 7090,
    strictPort: true,
    proxy: {
      '/api': {
        // target: 'https://api.github.com',
        target: 'http://127.0.0.1:4523/m1/6382740-6079334-default',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/mixins.scss" as *;
        @use "@/styles/variables.scss" as *;
        `,
        api: 'modern-compiler',
      },
    },
  },
})
