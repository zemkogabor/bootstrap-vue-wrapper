import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'
import * as path from 'path'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts(),
    libInjectCss(),
  ],
  server: {
    port: 5199,
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'ssr-safe': resolve(__dirname, 'src/ssr-safe.ts'),
      },
      formats: ['es'],
      name: 'BootstrapVueWrapper',
      fileName: 'bootstrap-vue-wrapper',
    },
    rollupOptions: {
      external: [
        'vue',
        'bootstrap',
        'bootstrap-icons',
        'sass',
        '@popperjs/core',
        '@zemkogabor/vue-form-validator',
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
