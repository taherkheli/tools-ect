import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    testTimeout: 70000, // 70 seconds timeout for all tests
  },
});