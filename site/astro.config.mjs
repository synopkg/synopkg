import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://synopkg.github.io/synopkg',
  base: '/synopkg',
  integrations: [
    starlight({
      title: 'Synopkg',
      social: {
        github: 'https://github.com/synopkg/synopkg',
        twitter: 'https://twitter.com/fold_left',
      },
      editLink: {
        baseUrl: 'https://github.com/synopkg/synopkg/edit/starlight/site/',
      },
      favicon: '/favicon.ico',
      logo: {
        src: './src/assets/logo.svg',
      },
      components: {
        Sidebar: './src/components/Sidebar.astro',
      },
      customCss: ['./src/styles/custom.css'],
      defaultLocale: 'en',
      locales: {
        en: {
          label: 'English',
          lang: 'en-GB',
        },
      },
      sidebar: [
        {
          label: 'Github',
          link: 'https://github.com/synopkg/synopkg',
        },
        {
          label: 'Guides',
          autogenerate: { directory: 'guide' },
        },
        {
          label: 'Commands',
          autogenerate: { directory: 'command' },
        },
        {
          label: 'Config',
          autogenerate: { directory: 'config' },
        },
        {
          label: 'Integrations',
          autogenerate: { directory: 'integrations' },
        },
        {
          label: 'Examples',
          autogenerate: { directory: 'examples' },
        },
      ],
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:image',
            content: '/synopkg/social-card.jpg',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: '/synopkg/social-card.jpg',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:width',
            content: '1200',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:height',
            content: '675',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:creator',
            content: '@fold_left',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:site',
            content: '@fold_left',
          },
        },
      ],
    }),
  ],
});
