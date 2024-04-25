export const scenes = [
  {
    id: 'audio',
    debugLabel: 'Audio',
    namedExport: 'AudioScene',
    module: () => import('@/scenes/AudioScene.ts'),
  },
  {
    id: 'focus',
    debugLabel: 'Focus Management',
    namedExport: 'FocusScene',
    module: () => import('@/scenes/FocusScene'),
  },
  {
    id: 'cam',
    debugLabel: 'Camera Testing',
    namedExport: 'CameraScene',
    module: () => import('@/scenes/CameraScene'),
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
    debugLabel: 'TowerFall Physics',
    namedExport: 'TowerFallPhysicsScene',
    module: () => import('@/scenes/TowerFallPhysicsScene'),
    plugins: ['physics'],
  },
];
