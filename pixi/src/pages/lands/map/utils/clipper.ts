import { Clipper, Paths, PolyType, PolyFillType, JS, ClipType } from 'clipper-lib';

function toClipperPaths(points: number[][]) {
  return points.map((c) => {
    const paths = [];
    for (let i = 0; i < c.length; i += 1) {
      if (i % 2) paths.push({ X: c[i - 1], Y: c[i] });
    }
    return paths;
  });
}

type Point = { X: number; Y: number };

type Coords = Point[][];

export function combinedVertices(subjPositions: number[][], clipPositions: number[][]) {
  // const subj1 = [0, 0, 50, 0, 50, 50, 0, 50];
  // const clip1 = [25, 25, 75, 25, 75, 75, 25, 75];

  // const subj1 = [2328, 2249, 2329, 2249, 2328, 2250, 2329, 2250];
  // const clip1 = [2329, 2249, 2330, 2249, 2329, 2250, 2330, 2250];

  const solutionPaths = union(subjPositions, clipPositions);
  // 计算绘制图形面积
  const area: number = JS.AreaOfPolygons(solutionPaths);

  return { vertices: solutionPaths, area };
}

export function union(subjPoints: number[][], clipPoints: number[][]) {
  const cpr = new Clipper();

  cpr.AddPaths(toClipperPaths(subjPoints), PolyType.ptSubject, true);
  cpr.AddPaths(toClipperPaths(clipPoints), PolyType.ptClip, true);

  const subjFillType = PolyFillType.pftNonZero;
  const clipFillType = PolyFillType.pftNonZero;

  const solutionPaths: Coords = new Paths();
  cpr.Execute(ClipType.ctUnion, solutionPaths, subjFillType, clipFillType);

  return solutionPaths;
}

export function intersection(subjPoints: number[][], clipPoints: number[][]) {
  const cpr = new Clipper();

  cpr.AddPaths(toClipperPaths(subjPoints), PolyType.ptSubject, true);
  cpr.AddPaths(toClipperPaths(clipPoints), PolyType.ptClip, true);

  const polyFillType = PolyFillType.pftNonZero;

  const solutionPaths: Coords = new Paths();

  cpr.Execute(ClipType.ctIntersection, solutionPaths, polyFillType, polyFillType);

  return solutionPaths;
}

/** 根据路径计算图形面积 */
export const getArea = (paths: number[][]) => JS.AreaOfPolygons(toClipperPaths(paths));

export function difference(subjPoints: number[][], clipPoints: number[][]) {
  const cpr = new Clipper();
  cpr.StrictlySimple = true;

  cpr.AddPaths(toClipperPaths(subjPoints), PolyType.ptSubject, true);
  cpr.AddPaths(toClipperPaths(clipPoints), PolyType.ptClip, true);

  const polyFillType = PolyFillType.pftNonZero;

  const solutionPaths: Coords = new Paths();

  cpr.Execute(ClipType.ctDifference, solutionPaths, polyFillType, polyFillType);

  return solutionPaths;
}

export function orientation(points: Point[]) {
  return Clipper.Orientation(points);
}
