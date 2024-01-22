import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
});
