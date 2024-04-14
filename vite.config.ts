import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      name: 'BootstrapVueWrapper',
      fileName: 'bootstrap-vue-wrapper',
    },
    rollupOptions: {
      external: [
        'vue',
        'vue-i18n',
        'vue-router',
        'bootstrap',
        'bootstrap/js/dist/modal',
        'bootstrap/js/dist/toast',
        'bootstrap/js/dist/offcanvas',
        'bootstrap-icons',
        'sass',
        '@popperjs/core',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
    ],
  },
})
