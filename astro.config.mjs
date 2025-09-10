// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  env: {
      schema: {
          SUPABASE_KEY: envField.string({
              context: 'server',
              access: 'public'
          }),
      }
  },

  vite: {
    plugins: [tailwindcss()]
  }
});