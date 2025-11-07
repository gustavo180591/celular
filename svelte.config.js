import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Enable Svelte preprocessors for PostCSS and other transformations
  preprocess: vitePreprocess(),

  kit: {
    // Use the Netlify adapter for deployment
    adapter: adapter({
      // Enable Edge Functions for server-side rendering
      edge: false,
      
      // Use Netlify Functions for server-side rendering
      functions: {
        // Directory where Netlify will look for your serverless functions
        directory: './netlify/functions',
        // Node.js version to use for the functions
        nodeVersion: '18',
      },
      
      // Split your app into multiple functions for better performance
      split: true
    }),
    
    // Ensure client-side routing works with Netlify redirects
    alias: {
      '$lib': './src/lib',
      '$lib/*': './src/lib/*'
    },
  },
};

export default config;
