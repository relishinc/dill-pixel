# Crunch Physics Plugin

#### @dill-pixel/physics-crunch

A lightweight, grid-based AABB physics plugin for Dill Pixel games. Optimized for 2D platformers and games requiring precise, pixel-perfect collisions.

## Features

- 🎯 Pixel-perfect AABB collision detection
- 📦 Grid-based spatial partitioning for efficient collision checks
- 🎮 Optimized for 2D platformers and action games
- 🧩 System supports Actors (Dynamic), Solids (Static), and Sensors (Trigger - Dynamic or Static)
- 🎨 Debug visualization tools
- 🔄 Object pooling support
- 🎬 Scene-based integration

## Installation

```bash
npm install @dill-pixel/physics-crunch
```

## Quick Start

```typescript
// in dill-pixel.config.ts
defineConfig({
  //... other config
  plugins: ['crunch-physics', { autoLoad: false }],
});

// in your scene file
import { Scene } from 'dill-pixel';

// exports
export const plugins = ['crunch-physics']; // loads the plugin for your scene

// in your scene class
export default class MyCrunchScene extends Scene {
  get physics() {
    return this.app.getPlugin('crunch-physics') as ICrunchPhysicsPlugin;
  }

  async initialize() {
    await this.physics.initialize({
      gridSize: 32,
      gravity: 980,
      maxVelocity: 1000,
      debug: true,
    });

    // Create a player
    const player = physics.createActor({
      type: 'Player',
      position: [100, 100],
      size: [32, 64],
    });

    // Create a platform
    const platform = physics.createSolid({
      type: 'Platform',
      position: [0, 500],
      size: [800, 32],
    });

    // Create a coin pickup
    const coin = physics.createSensor({
      type: 'Coin',
      position: [200, 400],
      size: [32, 32],
    });
  }
}
```

## Core Components

### Actors

Dynamic entities that can move and collide (players, enemies, projectiles).

```typescript
class Player extends Actor {
  update(dt: number) {
    // Custom movement logic
    if (this.app.input.isKeyDown('ArrowRight')) {
      this.velocity.x = 200;
    }
  }

  onCollide(result: CollisionResult) {
    // Handle collisions
    if (result.solid.type === 'Spikes') {
      this.die();
    }
  }
}
```

### Solids

Static or moving collision objects (platforms, walls, obstacles).

```typescript
// Create a moving platform
const platform = physics.createSolid({
  type: 'Platform',
  position: [100, 300],
  size: [200, 32],
});

// Animate platform movement
gsap.to(platform, {
  x: 500,
  duration: 2,
  yoyo: true,
  repeat: -1,
});
```

### Sensors

Trigger zones for detecting overlaps (collectibles, checkpoints, damage zones).

```typescript
class Coin extends Sensor {
  onActorEnter(actor: Actor) {
    if (actor.type === 'Player') {
      increaseScore(10);
      this.physics.removeSensor(this);
    }
  }
}
```

### Groups

Containers for managing collections of entities that move together.

```typescript
// Create a moving platform with hazards
const group = physics.createGroup({
  type: 'MovingPlatform',
  position: [100, 300],
});

const platform = physics.createSolid({
  type: 'Platform',
  size: [200, 32],
});

const spikes = physics.createSensor({
  type: 'Spikes',
  position: [0, -32],
  size: [200, 32],
});

group.add(platform);
group.add(spikes);
```

## Advanced Features

### Spatial Partitioning

The plugin uses a grid-based spatial partitioning system to efficiently handle collision detection:

```typescript
// Configure grid size for your game's scale
physics.system.gridSize = 32;
```

### Debug Visualization

Enable debug rendering to visualize collision boxes and the spatial grid:

```typescript
physics.system.debug = true;
```

### Collision Resolution

Custom collision handling with type-based filtering:

```typescript
physics.system.setCollisionResolver((collisions) => {
  for (const collision of collisions) {
    // Handle specific collision types
    if (collision.type === 'Player|Enemy') {
      handlePlayerEnemyCollision(collision);
    }
  }
});
```

## Performance Tips

- Use appropriate grid sizes for your game's scale
- Enable culling for large levels
- Utilize object pooling for frequently created/destroyed entities
- Use sensor overlaps instead of continuous collision checks where possible

## License

MIT © Dill Pixel
