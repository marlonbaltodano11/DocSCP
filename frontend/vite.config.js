import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@json': fileURLToPath(new URL('./src/json', import.meta.url)),
      '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
      '@global_context': fileURLToPath(new URL('./src/global_context', import.meta.url)),
      '@fonts': fileURLToPath(new URL('./src/config/fonts', import.meta.url)),
      '@docs': fileURLToPath(new URL('./src/docs', import.meta.url)),
    },
  },
});
