import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
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
    visualizer({ open: true }),
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
      '/socket.io': {
        target: 'http://localhost:8080',
        ws: true,
        rewriteWsOrigin: true,
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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router', 'pinia', '@vueuse/core', '@xstate/vue'],
          'vendor-markdown': [
            'github-markdown-css',
            'markdown-it',
            'markdown-it-highlightjs',
            'highlight.js',
          ],
          'vendor-ui': ['lucide-vue-next', '@arco-design/web-vue'],
          'vendor-utils': [
            'axios',
            'dayjs',
            'qrcode',
            'dompurify',
            'mitt',
            'default-passive-events',
          ],
          'vendor-xstate': ['xstate'],
        },
      },
    },
  },
})
