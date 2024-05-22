import { NumberArrayLike } from './Utils';

export declare class Triangulator {
    private convexPolygons;
    private convexPolygonsIndices;
    private indicesArray;
    private isConcaveArray;
    private triangles;
    private polygonPool;
    private polygonIndicesPool;
    private static isConcave;
    private static positiveArea;
    private static winding;
    triangulate(verticesArray: NumberArrayLike): Array<number>;
    decompose(verticesArray: Array<number>, triangles: Array<number>): Array<Array<number>>;
}
//# sourceMappingURL=Triangulator.d.ts.map