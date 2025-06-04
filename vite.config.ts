import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts()],
  server: {
    port: 5199,
  },
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
        'bootstrap-icons',
        'sass',
        '@popperjs/core',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: ({ name: fileName }) => {
          return `${fileName}.js`
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
