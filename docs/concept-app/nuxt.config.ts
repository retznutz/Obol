export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  css: [
    '@fontsource/outfit/400.css',
    '@fontsource/outfit/500.css',
    '@fontsource/outfit/600.css',
    '@fontsource/outfit/700.css',
    '@fontsource/outfit/800.css',
    '@fontsource/jetbrains-mono/500.css',
    '~/assets/css/tokens.css',
    '~/assets/css/base.css',
  ],
  app: {
    head: {
      title: 'Obol',
      htmlAttrs: { lang: 'en', 'data-theme': 'dark' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'color-scheme', content: 'dark' },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/obol-sun.png' }],
    },
  },
})
