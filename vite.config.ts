import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@APIs', replacement: '/src/APIs' },
      { find: '@components', replacement: '/src/components' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@icons', replacement: '/src/icons' },
      { find: '@layouts', replacement: '/src/layouts' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@routes', replacement: '/src/routes' },
      { find: '@store', replacement: '/src/store' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@types', replacement: '/src/types' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@', replacement: '/src' },
    ],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
