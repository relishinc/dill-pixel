export const scenes = [
  {
    id: 'audio',
    debugLabel: 'Audio',
    namedExport: 'AudioScene',
    module: () => import('@/scenes/AudioScene'),
  },
  {
    id: 'voiceover',
    debugLabel: 'Voiceover / Captions',
    namedExport: 'VoiceoverScene',
    module: () => import('@/scenes/VoiceoverScene'),
  },
  {
    id: 'focus',
    debugLabel: 'Focus Management',
    namedExport: 'FocusScene',
    module: () => import('@/scenes/FocusScene'),
  },
  {
    id: 'popups',
    debugLabel: 'Popup Management',
    namedExport: 'PopupScene',
    module: () => import('@/scenes/PopupScene'),
  },
  {
    id: 'spine',
    debugLabel: 'Spine Testing',
    namedExport: 'SpineScene',
    module: () => import('@/scenes/SpineScene'),
  },
  {
    id: 'flexContainer',
    debugLabel: 'Flex Container',
    namedExport: 'FlexContainerScene',
    module: () => import('@/scenes/FlexContainerScene'),
  },
  {
    id: 'uiCanvas',
    debugLabel: 'UICanvas',
    namedExport: 'UICanvasScene',
    module: () => import('@/scenes/UICanvasScene'),
  },
  {
    id: 'physics',
    debugLabel: 'Snap Physics',
    namedExport: 'SnapPhysicsScene',
    module: () => import('@/scenes/SnapPhysicsScene'),
    plugins: ['physics'],
  },
  {
    id: 'runner',
    debugLabel: 'Endless Runner',
    namedExport: 'EndlessRunnerScene',
    module: () => import('@/scenes/EndlessRunnerScene'),
    plugins: ['physics'],
  },
];