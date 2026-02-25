import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import importToCDN from 'vite-plugin-cdn-import'
import viteCompression from 'vite-plugin-compression'
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
    visualizer({ open: false }),
    importToCDN({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: 'https://unpkg.com/vue@3/dist/vue.global.prod.js',
        },
        {
          name: 'highlight.js',
          var: 'hljs',
          path: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js',
        },
      ],
    }),
    // 2. 关键优化：开启 Gzip/Brotli 预压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // 超过10kb则压缩
      algorithm: 'gzip',
      ext: '.gz',
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
      '/socket.io': {
        target: 'http://localhost:8080',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
  preview: {
    host: true,
    port: 8090,
    proxy: {
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
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
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

// /* 这是反例教程，故意关了优化 */
// export default defineConfig({
//   plugins: [
//     vue(),
//     vueDevTools(),
//     Components({
//       resolvers: [
//         ArcoResolver({
//           sideEffect: true,
//         }),
//       ],
//     }),
//     AutoImport({
//       resolvers: [
//         ArcoResolver({
//           sideEffect: true,
//         }),
//       ],
//     }),
//     visualizer({ open: false }),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//     },
//   },
//   server: {
//     host: true,
//     port: 7090,
//     strictPort: true,
//     proxy: {
//       '/api': {
//         // target: 'https://api.github.com',
//         target: 'http://127.0.0.1:4523/m1/6382740-6079334-default',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//       '/socket.io': {
//         target: 'http://localhost:8080',
//         ws: true,
//         rewriteWsOrigin: true,
//       },
//     },
//   },
//   preview: {
//     host: true,
//     port: 8090,
//     proxy: {
//       '/socket.io': {
//         target: 'http://localhost:8080',
//         ws: true,
//         rewriteWsOrigin: true,
//       },
//     },
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         additionalData: `@use "@/styles/mixins.scss" as *;
//         @use "@/styles/variables.scss" as *;
//         `,
//         api: 'modern-compiler',
//       },
//     },
//   },
// })
