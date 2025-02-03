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
            { label: 'Application', link: '/fundamentals/application' },
            { label: 'Signals', link: '/fundamentals/signals' },
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
                { label: 'Button', link: '/fundamentals/ui/button' },
                { label: 'Joystick', link: '/fundamentals/ui/joystick' },
                { label: 'Popups', link: '/fundamentals/ui/popups' },
                { label: 'Toaster', link: '/fundamentals/ui/toaster' },
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
        {
          label: 'Utilities',
          items: [
            { label: 'Overview', link: '/utilities/overview' },

            { label: 'Math', link: '/utilities/math' },
            { label: 'Random', link: '/utilities/random' },
            { label: 'Number Formatting', link: '/utilities/number' },
            { label: 'Arrays', link: '/utilities/array' },
            { label: 'Map', link: '/utilities/map' },
            { label: 'Set', link: '/utilities/set' },
            { label: 'Object', link: '/utilities/object' },
            { label: 'Point Manipulation', link: '/utilities/point' },
            { label: 'Rectangle', link: '/utilities/rect' },
            { label: 'Color', link: '/utilities/color' },
            { label: 'String', link: '/utilities/string' },
            { label: 'Platform', link: '/utilities/platform' },
            { label: 'Promise', link: '/utilities/promise' },
            { label: 'Logger', link: '/utilities/logger' },
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
