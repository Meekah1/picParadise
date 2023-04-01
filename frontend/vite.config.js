import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // input: 'src/App.js',
  // optimizeDeps: {
  //   include: ['react', 'react-dom', 'lodash'],
  // },
});
