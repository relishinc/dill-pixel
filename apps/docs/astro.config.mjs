import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc';

import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'http://docs.dillpixel.io',
  base: '/',
  integrations: [
    starlight({
      title: 'dill pixel (v8)',
      logo: {
        src: './src/assets/jar.png',
      },
      social: {
        github: 'https://github.com/relishinc/dill-pixel/tree/v8',
      },
      editLink: {
        baseUrl: 'https://github.com/relishinc/dill-pixel/tree/docs',
      },
      plugins: [
        // Generate the documentation.
        starlightTypeDoc({
          entryPoints: ['../../packages/framework/src/index.ts'],
          tsconfig: '../../packages/framework/tsconfig.json',
          typeDoc: {
            exclude: ['**/node_modules/**'],
          },
        }),
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', link: '/guides/introduction' },
            { label: 'Quick Start', link: '/guides/quick-start' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Creating a Game', link: '/guides/creating-game' },
            { label: 'Project Setup', link: '/guides/project-setup' },
            { label: 'Examples', link: '/guides/examples' },
            { label: 'Using Spine', link: '/guides/spine' },
            { label: 'Physics', link: '/guides/physics' },
            { label: 'Audio', link: '/guides/audio' },
            { label: 'Popups', link: '/guides/popups' },
          ],
        },
        {
          label: 'Fundamentals',
          items: [
            { label: 'State Management', link: '/fundamentals/state' },
            { label: 'Layout', link: '/fundamentals/layout' },
            { label: 'Assets', link: '/fundamentals/assets' },
            { label: 'Styling Text', link: '/fundamentals/styling-text' },
            { label: 'Copy and Content', link: '/fundamentals/copy' },
            { label: 'Focus Management', link: '/fundamentals/focus' },
            { label: 'Web Events', link: '/fundamentals/web-events' },
            /*
            { label: 'Inputs', link: '/fundamentals/inputs' },
            */
          ],
        },
        typeDocSidebarGroup,
      ],
      customCss: ['./src/custom.css'],
    }),
  ],
});
