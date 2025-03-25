import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8', // 👈 usa el motor v8
      reportsDirectory: './coverage',
      reporter: ['text', 'html'], // puedes agregar 'lcov' si lo querés para CI
    },
  },
});
