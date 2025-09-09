// @ts-check
import { defineConfig, envField } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    env: {
        schema: {
            SUPABASE_KEY: envField.string({
                context: 'server',
                access: 'public'
            }),
        }
    }
});
