import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc';

import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

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
            { label: 'CLI', link: '/guides/cli' },
            { label: 'Examples', link: '/guides/examples' },
          ],
        },
        {
          label: 'Fundamentals',
          items: [
            { label: 'Overview', link: '/fundamentals/overview' },
            { label: 'Assets', link: '/fundamentals/assets' },
            { label: 'Actions', link: '/fundamentals/actions' },
            { label: 'Scenes', link: '/fundamentals/scenes' },
            { label: 'Data', link: '/fundamentals/data' },
            { label: 'Copy and Content', link: '/fundamentals/copy' },
            { label: 'Audio', link: '/fundamentals/audio' },
            {
              label: 'Animation',
              items: [
                { label: 'Animated Sprite', link: '/fundamentals/animation/animated-sprite' },
                { label: 'Spine', link: '/fundamentals/animation/spine' },
              ],
            },
            {
              label: 'UI',
              items: [
                { label: 'Text', link: '/fundamentals/ui/text' },
                { label: 'Layout', link: '/fundamentals/ui/layout' },
                { label: 'Popups', link: '/fundamentals/ui/popups' },
              ],
            },
            {
              label: 'Physics',
              items: [
                { label: 'Overview', link: '/fundamentals/physics/overview' },
                { label: 'Snap Physics Plugin', link: '/fundamentals/physics/snap' },
                { label: 'Matter Physics Plugin', link: '/fundamentals/physics/matter' },
              ],
            },
            {
              label: 'Accessibility',
              items: [
                { label: 'Overview', link: '/fundamentals/accessibility/overview' },
                { label: 'Focus Management', link: '/fundamentals/accessibility/focus-management' },
                { label: 'Voiceover', link: '/fundamentals/accessibility/voiceover' },
                { label: 'Captions', link: '/fundamentals/accessibility/captions' },
              ],
            },
          ],
        },
        typeDocSidebarGroup,
      ],
      customCss: ['./src/custom.css'],
    }),
    tailwind(),
  ],
  outDir: './dist',
  exclude: ['./examples/**/*'],
});
