import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Enable Svelte preprocessors for PostCSS and other transformations
  preprocess: [vitePreprocess()],

  kit: {
    // Use the Netlify adapter for deployment
    adapter: adapter({
      // Use regular Netlify Functions (set to true for Edge Functions)
      edge: false,
      // Keep split disabled for simpler deployment
      split: false
    })
  }
};

export default config;
