import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Enable Svelte preprocessors for PostCSS and other transformations
  preprocess: [vitePreprocess()],

  kit: {
    // Use the Netlify adapter for deployment
    adapter: adapter({
      // Use Netlify Edge Functions (false for regular Netlify Functions)
      edge: false,
      
      // If you need to include files that aren't in the static directory,
      // you can specify additional directories to include in the build output
      // This is useful for including server-side code or other assets
      include: ['**/*.js', '**/*.ts']
    }),
    
    // Ensure client-side routing works with Netlify redirects
    alias: {
      '$lib': './src/lib',
      '$lib/*': './src/lib/*'
    }
  }
};

export default config;
