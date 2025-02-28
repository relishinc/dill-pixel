import BaseScene from '@/scenes/BaseScene';
import MatterPhysicsPlugin from '@dill-pixel/plugin-matter-physics';

export const id = 'matter-platformer';
export const debug = {
  group: 'Matter Physics',
  label: 'Platformer',
  order: 5,
};

export const plugins = ['matter-physics'];

export default class MatterPlatformer extends BaseScene {
  title = 'Matter Physics - Platformer';
  subtitle = 'Use the arrow keys to move the player';

  protected config = {
    useCamera: true,
    zoom: 1,
  };

  protected get physics(): MatterPhysicsPlugin {
    return this.app.getPlugin('matter-physics') as unknown as MatterPhysicsPlugin;
  }

  configureGUI() {
    this.gui;
  }

  async initialize() {
    await super.initialize();
  }

  destroy() {
    super.destroy();
  }
}
