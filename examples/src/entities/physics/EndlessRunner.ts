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

  static get currentWidth() {
    return EndlessRunner._totalWidth;
  }

  static get hasEnoughSegments() {
    return EndlessRunner._totalWidth >= EndlessRunner.width;
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
    EndlessRunner.segments.forEach((segment) => {
      if (segment.x <= -segment.width) {
        EndlessRunner.removeSegment(segment);
        return;
      }
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
    EndlessRunner.clear();
    EndlessRunner._totalWidth = EndlessRunner.width = 0;
  }

  public static clear() {
    EndlessRunner.segments.forEach((segment) => {
      EndlessRunner.removeSegment(segment);
    });
    EndlessRunner.segments.clear();
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
