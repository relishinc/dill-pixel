import { Segment, SegmentConfig } from '@/entities/physics/Segment';
import { Point, Pool } from 'pixi.js';
import { System } from '@dill-pixel/plugin-snap-physics';
import { PointLike, resolvePointLike } from 'dill-pixel';

export class EndlessRunner {
  static movement: Point = new Point();
  static pool: Pool<Segment> = new Pool(Segment, 10);
  static segments: Set<Segment> = new Set();
  static width: number;
  private static _totalWidth: number = 0;

  static get hasEnoughSegments() {
    return EndlessRunner._totalWidth >= EndlessRunner.width * 1.5;
  }

  static createSegment(config: SegmentConfig) {
    const segment = this.pool.get(config);
    segment.x = EndlessRunner._totalWidth;
    EndlessRunner.segments.add(segment);
    EndlessRunner.cacheTotalWidth();
    return segment;
  }

  static removeSegment(segment: Segment) {
    this.segments.delete(segment);
    EndlessRunner.pool.return(segment);
    EndlessRunner.cacheTotalWidth();
  }

  static update(deltaTime: number) {
    this.segments.forEach((segment) => {
      segment.update(deltaTime);
    });
    if (System.grid) {
      System.grid.updateAll();
    }
  }

  static initialize(width: number, movement: PointLike) {
    EndlessRunner.width = width;
    EndlessRunner.movement = resolvePointLike(movement, true);
  }

  public static destroy() {
    EndlessRunner.segments.forEach((segment) => {
      segment.destroy();
    });
    EndlessRunner.segments.clear();
    EndlessRunner._totalWidth = EndlessRunner.width = 0;
  }

  private static cacheTotalWidth() {
    // get combined width of all segments
    let totalWidth = 0;
    EndlessRunner.segments.forEach((segment) => {
      totalWidth += segment.width;
    });
    EndlessRunner._totalWidth = totalWidth;
  }
}
