import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const basePath =
  process.env.BASE_PATH ||
  (process.env.NODE_ENV === 'production' ? '/rise-international-ngo-platform/' : '/')

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'github-pages-images-prefix',
      transform(code, id) {
        if (
          basePath !== '/' &&
          id.includes('src') &&
          (id.endsWith('.tsx') || id.endsWith('.ts') || id.endsWith('.json'))
        ) {
          return {
            code: code.replace(/(["'])\/images\//g, `$1${basePath}images/`),
            map: null,
          }
        }
      },
    },
  ],
  base: basePath,
})
