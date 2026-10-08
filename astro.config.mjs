// @ts-check
import { defineConfig } from 'astro/config';
import { LINK_TARGETS } from './src/data/links.mjs';

// https://astro.build/config
export default defineConfig({
    site: "https://woven-ai.github.io",
    build: {
        assets: "_astro"
    },
    // Stable short links used in the paper: /code and /data redirect to LINK_TARGETS.
    redirects: {
        '/code': LINK_TARGETS.code,
        '/data': LINK_TARGETS.data,
    },
});
