import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';

const HTTPS_TEST = true;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: HTTPS_TEST ? [react(), mkcert()] : [react()],
  resolve: {
    alias: [
      { find: '@APIs', replacement: '/src/APIs' },
      { find: '@Assets', replacement: '/src/Assets' },
      { find: '@Components', replacement: '/src/Components' },
      { find: '@Hooks', replacement: '/src/Hooks' },
      { find: '@Icons', replacement: '/src/Icons' },
      { find: '@Layouts', replacement: '/src/Layouts' },
      { find: '@Pages', replacement: '/src/Pages' },
      { find: '@Routes', replacement: '/src/Routes' },
      { find: '@Store', replacement: '/src/Store' },
      { find: '@Styles', replacement: '/src/Styles' },
      { find: '@Type', replacement: '/src/Type' },
      { find: '@Utils', replacement: '/src/Utils' },
      { find: '@', replacement: '/src' },
    ],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  server: {
    https: HTTPS_TEST,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://118.67.143.25:8080',
        changeOrigin: true,
      },
    },
  },
});
