import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc';

// https://astro.build/config
export default defineConfig({
  site: 'http://docs.dillpixel.io',
  base: '/',
  integrations: [
    starlight({
      title: 'dill pixel',
      logo: {
        src: './src/assets/jar.png',
      },      
      social: {
        github: 'https://github.com/relishinc/dill-pixel',
      },
      editLink: {
        baseUrl: 'https://github.com/relishinc/dill-pixel/tree/main/docs',
      },
      plugins: [
        // Generate the documentation.
        starlightTypeDoc({
          entryPoints: ['../src/index.ts'],
          tsconfig: '../tsconfig.json',
          typeDoc: {
            exclude: ['**/node_modules/**'],
          }
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
          ],
        },
				typeDocSidebarGroup,
      ],
      customCss: ['./src/custom.css'],
    }),
  ],
});
