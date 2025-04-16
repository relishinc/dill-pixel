import { Application, IApplication, Logger } from 'dill-pixel';
import Matter, { Bodies, Body, Engine, Runner, World } from 'matter-js';
import { Container, Graphics, Rectangle, Ticker } from 'pixi.js';

import { IMatterPhysicsObject } from './interfaces';
import { MatterPhysicsPluginOptions } from './MatterPhysicsPlugin';
import { MatterBodyLike } from './types';

export class System {
  public static pluginOptions: Partial<MatterPhysicsPluginOptions>;
  public static container: Container;

  private static _options: Partial<MatterPhysicsPluginOptions>;
  private static _objects: Set<IMatterPhysicsObject> = new Set();
  private static _debugGraphics: Graphics | null = null;
  private static _walls: Body[];
  private static _debug: boolean = false;

  private static _ceiling: Body;
  private static _floor: Body;
  private static _leftWall: Body;
  private static _rightWall: Body;

  static get ceiling() {
    return System._ceiling;
  }

  static get floor() {
    return System._floor;
  }

  static get leftWall() {
    return System._leftWall;
  }

  static get rightWall() {
    return System._rightWall;
  }

  static get walls() {
    return System._walls;
  }

  static get debug() {
    return System._debug;
  }

  static set debug(value: boolean) {
    System._debug = value;
    if (!System._debug && System._debugGraphics) {
      System._debugGraphics.destroy();
      System._debugGraphics.parent?.removeChild(System._debugGraphics);
      System._debugGraphics = null;
    }
  }

  private static _enabled: boolean = false;

  static get enabled() {
    return System._enabled;
  }

  static set enabled(value: boolean) {
    System._enabled = value;
    System.app.ticker.remove(System.update);
    if (System._enabled) {
      if (System._engine) {
        Runner.run(System._engine);
      }
      System.app.ticker.add(System.update);
    } else {
      if (System._runner) {
        Runner.stop(System._runner);
      }
      System.app.ticker.remove(System.update);
    }
  }

  private static _runner: Runner;

  static get world() {
    return World;
  }

  static get api() {
    return {
      axes: Matter.Axes,
      bodies: Matter.Bodies,
      body: Matter.Body,
      common: Matter.Common,
      composite: Matter.Composite,
      composites: Matter.Composites,
      constraint: Matter.Constraint,
      contact: Matter.Contact,
      engine: Matter.Engine,
      events: Matter.Events,
      runner: Matter.Runner,
      sleeping: Matter.Sleeping,
      vector: Matter.Vector,
      vertices: Matter.Vertices,
      world: Matter.World,
    };
  }

  static get runner() {
    return System._runner;
  }

  private static _engine: Engine;

  static get engine() {
    return System._engine;
  }

  private static _bounds: Rectangle;

  static get bounds() {
    return System._bounds;
  }

  static set bounds(bounds: Rectangle) {
    System._bounds = bounds;
  }

  private static get app(): IApplication {
    return Application.getInstance();
  }

  static destroy() {
    Logger.warn('MatterPhysicsPlugin:: Destroying Matter Physics System');
    System.enabled = false;
    try {
      World.clear(System._engine?.world, false);
    } catch (e) {
      Logger.warn(e);
    }
    try {
      Engine.clear(System._engine);
    } catch (e) {
      Logger.warn(e);
    }
    try {
      Runner.stop(System._runner);
    } catch (e) {
      Logger.warn(e);
    }
    try {
      System._objects.clear();
      System._debugGraphics?.destroy({ children: true });
      System._debugGraphics = null;
    } catch (e) {
      Logger.warn(e);
    }
  }

  static initialize(options: Partial<MatterPhysicsPluginOptions>) {
    System._options = { ...System.pluginOptions, ...options };
    System._engine = Engine.create(System._options.engine);
    System._runner = Runner.create(System._options.runner);
    Runner.run(System._engine);

    if (System._options.container) {
      System.container = System._options.container;
    }

    if (System._options.worldBounds) {
      System.bounds = System._options.worldBounds;
    }
    if (System._options.createWalls) {
      const thickness = System._options.createWalls.thickness ?? 10;
      const { width, height } = System.bounds;
      const walls = [];
      const wallOptions = {
        isStatic: true,
        density: 1000,
        friction: 0,
        frictionStatic: 0,
      };

      if (System._options.createWalls.top) {
        const ceiling = Bodies.rectangle(width / 2, -thickness / 2, width, thickness, wallOptions);
        walls.push(ceiling);
        System._ceiling = ceiling;
      }
      if (System._options.createWalls.bottom) {
        const floor = Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, wallOptions);
        walls.push(floor);
        System._floor = floor;
      }
      if (System._options.createWalls.left) {
        const leftWall = Bodies.rectangle(-thickness / 2, height / 2, thickness, height + thickness, wallOptions);
        walls.push(leftWall);
        System._leftWall = leftWall;
      }
      if (System._options.createWalls.right) {
        const rightWall = Bodies.rectangle(
          width + thickness / 2,
          height / 2,
          thickness,
          height + thickness,
          wallOptions,
        );
        walls.push(rightWall);
        System._rightWall = rightWall;
      }
      System._walls = walls;
      System.addToWorld(...walls);
    }

    if (System._options.debug) {
      System.debug = true;
    }
  }

  static addToWorld(...objects: (IMatterPhysicsObject | MatterBodyLike)[]) {
    objects.forEach((obj) => {
      let body: MatterBodyLike;
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty('body')) {
        body = (obj as IMatterPhysicsObject).body;
        this._objects.add(obj as IMatterPhysicsObject);
      } else {
        body = obj as MatterBodyLike;
      }
      World.add(System._engine.world, body);
    });
  }

  static removeFromWorld(...objects: (IMatterPhysicsObject | MatterBodyLike)[]) {
    objects.forEach((obj) => {
      let body: MatterBodyLike;
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty('body')) {
        body = (obj as IMatterPhysicsObject).body;
        this._objects.add(obj as IMatterPhysicsObject);
      } else {
        body = obj as MatterBodyLike;
      }
      World.remove(this._engine.world, body);
      System._objects.delete(obj as IMatterPhysicsObject);
    });
  }

  static drawDebug() {
    if (!System.enabled) {
      return;
    }
    if (!System._debugGraphics) {
      System._debugGraphics = new Graphics();
      System._debugGraphics.zIndex = 1000;
      System._debugGraphics.sortableChildren = true;
    }
    if (System.container && !System._debugGraphics.parent) {
      System.container.addChild(System._debugGraphics);
    }
    System._debugGraphics.clear();
    System._objects.forEach((obj) => {
      const body = obj.body as Body;
      const color = obj?.debugColor || 0x29c5f6;

      // For compound bodies, draw each part
      if (body.parts && body.parts.length > 1) {
        // Skip index 0 as it's the parent body
        for (let i = 1; i < body.parts.length; i++) {
          const part = body.parts[i];
          if (System._debugGraphics && part.vertices.length > 0) {
            System._debugGraphics.moveTo(part.vertices[0].x, part.vertices[0].y);

            for (let j = 1; j < part.vertices.length; j++) {
              System._debugGraphics.lineTo(part.vertices[j].x, part.vertices[j].y);
            }

            System._debugGraphics.lineTo(part.vertices[0].x, part.vertices[0].y);
            System._debugGraphics.fill({ color, alpha: 0.25 });
            System._debugGraphics.stroke({ color: 0xff0000, pixelLine: true });
          }
        }
      } else {
        // Original single body drawing
        const vertices = body.vertices;
        if (System._debugGraphics && vertices.length > 0) {
          System._debugGraphics.moveTo(vertices[0].x, vertices[0].y);

          for (let j = 1; j < vertices.length; j++) {
            System._debugGraphics.lineTo(vertices[j].x, vertices[j].y);
          }

          System._debugGraphics.lineTo(vertices[0].x, vertices[0].y);
          System._debugGraphics.fill({ color, alpha: 0.25 });
          System._debugGraphics.stroke({ color: 0xff0000, pixelLine: true });
        }
      }
    });
    System._walls?.forEach((wall) => {
      const body = wall as Body;
      const vertices = body.vertices;
      if (System._debugGraphics && vertices.length > 0) {
        System._debugGraphics.moveTo(vertices[0].x, vertices[0].y);
        for (let j = 1; j < vertices.length; j++) {
          System._debugGraphics.lineTo(vertices[j].x, vertices[j].y);
        }
        System._debugGraphics.lineTo(vertices[0].x, vertices[0].y);
        System._debugGraphics.fill({ color: 0x00ff00, alpha: 1 });
        System._debugGraphics.stroke({ color: 0xff0000, pixelLine: true });
      }
    });
  }

  private static update(ticker: Ticker) {
    if (!System._enabled) {
      return;
    }
    if (System._engine) {
      System._objects.forEach((obj) => {
        obj.update();
      });
      if (System.debug) {
        System.drawDebug();
      }
      Engine.update(System._engine, 16.67, ticker.deltaTime);
    }
  }
}
