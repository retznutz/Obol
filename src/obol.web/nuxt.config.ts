// https://nuxt.com/docs/api/configuration/nuxt-config

// The .NET API (src/Obol.Api) serves /api and the game files under /games.
const apiUrl = process.env.OBOL_API_URL ?? 'http://localhost:5080'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Games run entirely in the browser (canvas, WebAudio, wasm), and the
  // production build is a static site served by the API.
  ssr: false,

  devServer: { port: 3000 },

  // In dev, forward API and game requests so the browser sees one origin.
  nitro: {
    devProxy: {
      '/api': { target: `${apiUrl}/api`, changeOrigin: true },
      '/games': { target: `${apiUrl}/games`, changeOrigin: true },
    },
  },

  app: {
    head: {
      title: 'Obol',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }],
    },
  },

  css: ['~/assets/main.css'],
})
