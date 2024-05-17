/******************************************************************************
 * Spine Runtimes License Agreement
 * Last updated July 28, 2023. Replaces all prior versions.
 *
 * Copyright (c) 2013-2023, Esoteric Software LLC
 *
 * Integration of the Spine Runtimes into software or otherwise creating
 * derivative works of the Spine Runtimes is permitted under the terms and
 * conditions of Section 2 of the Spine Editor License Agreement:
 * http://esotericsoftware.com/spine-editor-license
 *
 * Otherwise, it is permitted to integrate the Spine Runtimes into software or
 * otherwise create derivative works of the Spine Runtimes (collectively,
 * "Products"), provided that each user of the Products must obtain their own
 * Spine Editor license and redistribution of the Products in any form must
 * include this license and copyright notice.
 *
 * THE SPINE RUNTIMES ARE PROVIDED BY ESOTERIC SOFTWARE LLC "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ESOTERIC SOFTWARE LLC BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES,
 * BUSINESS INTERRUPTION, OR LOSS OF USE, DATA, OR PROFITS) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE
 * SPINE RUNTIMES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *****************************************************************************/
import { Pool } from './Utils';
export class Triangulator {
    convexPolygons = new Array();
    convexPolygonsIndices = new Array();
    indicesArray = new Array();
    isConcaveArray = new Array();
    triangles = new Array();
    polygonPool = new Pool(() => {
        return new Array();
    });
    polygonIndicesPool = new Pool(() => {
        return new Array();
    });
    static isConcave(index, vertexCount, vertices, indices) {
        const previous = indices[(vertexCount + index - 1) % vertexCount] << 1;
        const current = indices[index] << 1;
        const next = indices[(index + 1) % vertexCount] << 1;
        return !this.positiveArea(vertices[previous], vertices[previous + 1], vertices[current], vertices[current + 1], vertices[next], vertices[next + 1]);
    }
    static positiveArea(p1x, p1y, p2x, p2y, p3x, p3y) {
        return p1x * (p3y - p2y) + p2x * (p1y - p3y) + p3x * (p2y - p1y) >= 0;
    }
    static winding(p1x, p1y, p2x, p2y, p3x, p3y) {
        const px = p2x - p1x, py = p2y - p1y;
        return p3x * py - p3y * px + px * p1y - p1x * py >= 0 ? 1 : -1;
    }
    triangulate(verticesArray) {
        const vertices = verticesArray;
        let vertexCount = verticesArray.length >> 1;
        const indices = this.indicesArray;
        indices.length = 0;
        for (let i = 0; i < vertexCount; i++)
            indices[i] = i;
        const isConcave = this.isConcaveArray;
        isConcave.length = 0;
        for (let i = 0, n = vertexCount; i < n; ++i)
            isConcave[i] = Triangulator.isConcave(i, vertexCount, vertices, indices);
        const triangles = this.triangles;
        triangles.length = 0;
        while (vertexCount > 3) {
            // Find ear tip.
            let previous = vertexCount - 1, i = 0, next = 1;
            while (true) {
                outer: if (!isConcave[i]) {
                    const p1 = indices[previous] << 1, p2 = indices[i] << 1, p3 = indices[next] << 1;
                    const p1x = vertices[p1], p1y = vertices[p1 + 1];
                    const p2x = vertices[p2], p2y = vertices[p2 + 1];
                    const p3x = vertices[p3], p3y = vertices[p3 + 1];
                    for (let ii = (next + 1) % vertexCount; ii != previous; ii = (ii + 1) % vertexCount) {
                        if (!isConcave[ii])
                            continue;
                        const v = indices[ii] << 1;
                        const vx = vertices[v], vy = vertices[v + 1];
                        if (Triangulator.positiveArea(p3x, p3y, p1x, p1y, vx, vy)) {
                            if (Triangulator.positiveArea(p1x, p1y, p2x, p2y, vx, vy)) {
                                if (Triangulator.positiveArea(p2x, p2y, p3x, p3y, vx, vy))
                                    break outer;
                            }
                        }
                    }
                    break;
                }
                if (next == 0) {
                    do {
                        if (!isConcave[i])
                            break;
                        i--;
                    } while (i > 0);
                    break;
                }
                previous = i;
                i = next;
                next = (next + 1) % vertexCount;
            }
            // Cut ear tip.
            triangles.push(indices[(vertexCount + i - 1) % vertexCount]);
            triangles.push(indices[i]);
            triangles.push(indices[(i + 1) % vertexCount]);
            indices.splice(i, 1);
            isConcave.splice(i, 1);
            vertexCount--;
            const previousIndex = (vertexCount + i - 1) % vertexCount;
            const nextIndex = i == vertexCount ? 0 : i;
            isConcave[previousIndex] = Triangulator.isConcave(previousIndex, vertexCount, vertices, indices);
            isConcave[nextIndex] = Triangulator.isConcave(nextIndex, vertexCount, vertices, indices);
        }
        if (vertexCount == 3) {
            triangles.push(indices[2]);
            triangles.push(indices[0]);
            triangles.push(indices[1]);
        }
        return triangles;
    }
    decompose(verticesArray, triangles) {
        const vertices = verticesArray;
        const convexPolygons = this.convexPolygons;
        this.polygonPool.freeAll(convexPolygons);
        convexPolygons.length = 0;
        const convexPolygonsIndices = this.convexPolygonsIndices;
        this.polygonIndicesPool.freeAll(convexPolygonsIndices);
        convexPolygonsIndices.length = 0;
        let polygonIndices = this.polygonIndicesPool.obtain();
        polygonIndices.length = 0;
        let polygon = this.polygonPool.obtain();
        polygon.length = 0;
        // Merge subsequent triangles if they form a triangle fan.
        let fanBaseIndex = -1, lastWinding = 0;
        for (let i = 0, n = triangles.length; i < n; i += 3) {
            const t1 = triangles[i] << 1, t2 = triangles[i + 1] << 1, t3 = triangles[i + 2] << 1;
            const x1 = vertices[t1], y1 = vertices[t1 + 1];
            const x2 = vertices[t2], y2 = vertices[t2 + 1];
            const x3 = vertices[t3], y3 = vertices[t3 + 1];
            // If the base of the last triangle is the same as this triangle, check if they form a convex polygon (triangle fan).
            let merged = false;
            if (fanBaseIndex == t1) {
                const o = polygon.length - 4;
                const winding1 = Triangulator.winding(polygon[o], polygon[o + 1], polygon[o + 2], polygon[o + 3], x3, y3);
                const winding2 = Triangulator.winding(x3, y3, polygon[0], polygon[1], polygon[2], polygon[3]);
                if (winding1 == lastWinding && winding2 == lastWinding) {
                    polygon.push(x3);
                    polygon.push(y3);
                    polygonIndices.push(t3);
                    merged = true;
                }
            }
            // Otherwise make this triangle the new base.
            if (!merged) {
                if (polygon.length > 0) {
                    convexPolygons.push(polygon);
                    convexPolygonsIndices.push(polygonIndices);
                }
                else {
                    this.polygonPool.free(polygon);
                    this.polygonIndicesPool.free(polygonIndices);
                }
                polygon = this.polygonPool.obtain();
                polygon.length = 0;
                polygon.push(x1);
                polygon.push(y1);
                polygon.push(x2);
                polygon.push(y2);
                polygon.push(x3);
                polygon.push(y3);
                polygonIndices = this.polygonIndicesPool.obtain();
                polygonIndices.length = 0;
                polygonIndices.push(t1);
                polygonIndices.push(t2);
                polygonIndices.push(t3);
                lastWinding = Triangulator.winding(x1, y1, x2, y2, x3, y3);
                fanBaseIndex = t1;
            }
        }
        if (polygon.length > 0) {
            convexPolygons.push(polygon);
            convexPolygonsIndices.push(polygonIndices);
        }
        // Go through the list of polygons and try to merge the remaining triangles with the found triangle fans.
        for (let i = 0, n = convexPolygons.length; i < n; i++) {
            polygonIndices = convexPolygonsIndices[i];
            if (polygonIndices.length == 0)
                continue;
            const firstIndex = polygonIndices[0];
            const lastIndex = polygonIndices[polygonIndices.length - 1];
            polygon = convexPolygons[i];
            const o = polygon.length - 4;
            let prevPrevX = polygon[o], prevPrevY = polygon[o + 1];
            let prevX = polygon[o + 2], prevY = polygon[o + 3];
            const firstX = polygon[0], firstY = polygon[1];
            const secondX = polygon[2], secondY = polygon[3];
            const winding = Triangulator.winding(prevPrevX, prevPrevY, prevX, prevY, firstX, firstY);
            for (let ii = 0; ii < n; ii++) {
                if (ii == i)
                    continue;
                const otherIndices = convexPolygonsIndices[ii];
                if (otherIndices.length != 3)
                    continue;
                const otherFirstIndex = otherIndices[0];
                const otherSecondIndex = otherIndices[1];
                const otherLastIndex = otherIndices[2];
                const otherPoly = convexPolygons[ii];
                const x3 = otherPoly[otherPoly.length - 2], y3 = otherPoly[otherPoly.length - 1];
                if (otherFirstIndex != firstIndex || otherSecondIndex != lastIndex)
                    continue;
                const winding1 = Triangulator.winding(prevPrevX, prevPrevY, prevX, prevY, x3, y3);
                const winding2 = Triangulator.winding(x3, y3, firstX, firstY, secondX, secondY);
                if (winding1 == winding && winding2 == winding) {
                    otherPoly.length = 0;
                    otherIndices.length = 0;
                    polygon.push(x3);
                    polygon.push(y3);
                    polygonIndices.push(otherLastIndex);
                    prevPrevX = prevX;
                    prevPrevY = prevY;
                    prevX = x3;
                    prevY = y3;
                    ii = 0;
                }
            }
        }
        // Remove empty polygons that resulted from the merge step above.
        for (let i = convexPolygons.length - 1; i >= 0; i--) {
            polygon = convexPolygons[i];
            if (polygon.length == 0) {
                convexPolygons.splice(i, 1);
                this.polygonPool.free(polygon);
                polygonIndices = convexPolygonsIndices[i];
                convexPolygonsIndices.splice(i, 1);
                this.polygonIndicesPool.free(polygonIndices);
            }
        }
        return convexPolygons;
    }
}