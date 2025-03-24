import { Face,  Obj3D,  WebglPrimitives } from "../type/type";

export const parsingType: WebglPrimitives = WebglPrimitives.LINE;

function addVertex(obj: Obj3D, face: Face, faceVertex: string) {
  const [p, t, n] = faceVertex.split("/");
  const value = parseInt(p);
  const index = value > 0 ? value - 1 : obj.vertices.length + value;

  face.positions.push(obj.vertices[index]);
}

function parseOBJ(file: string): Obj3D {
  const obj: Obj3D = {
    vertices: [] as [number, number, number][],
    faces: [] as Face[],
    center:[] as number[],
    bound: {} as any
  };
  const keywords = {
    v: (parts) => obj.vertices.push(parts.map(parseFloat)),
    f: (parts) => {
      const face = { positions: [] } as Face;
      const numTriangles = parts.length - 2;
      for (let i = 0; i < numTriangles; i++) {
        addVertex(obj, face, parts[0]);
        addVertex(obj, face, parts[1 + i]);
        addVertex(obj, face, parts[2 + i]);
      }
      obj.faces.push(face);
    }
  };
  const keywordRE = /^(\w*)(?: )*(.*)$/;
  const lines = file.split("\n");

  lines.forEach((line) => {
    line = line.trim();
    if (line === "" || line.startsWith("#")) return;
    
    const m = keywordRE.exec(line);

    if (!m) return;

    const [, keyword, unparsedArgs] = m;
    const parts = line.split(/\s+/).slice(1);
    const handler = keywords[keyword];

    console.log(keywords[keyword]);

    handler && handler(parts, unparsedArgs);
    !handler && console.warn(`unhandled keyword: ${keyword}`);
  });
  obj.center = calculateCenter(obj.vertices);
  obj.bound = calculateBound(obj.vertices)
  console.log(`obj = `, obj);
  return obj;
}

function calculateBound(vertices: [number, number, number][]): any {
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;

  vertices.forEach(([x, y, z]) => {
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    minZ = z < minZ ? z : minZ;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;
    maxZ = z > maxZ ? z : maxZ;
  });

  const width = maxX - minX;
  const height = maxY - minY;
  const depth = maxZ - minZ;
  const r = Math.sqrt(width**2 + height**2 + depth**2) / 2;

  return {
    width,
    height,
    depth,
    r
  }
}

function calculateCenter(vertices: [number, number, number][]): number[] {
  let centerX = 0;
  let centerY = 0;
  let centerZ = 0;

  vertices.forEach(([x, y, z]) => {
    centerX += x;
    centerY += y;
    centerZ += z;
  })

  centerX /= vertices.length;
  centerY /= vertices.length;
  centerZ /= vertices.length;
  return [centerX, centerY, centerZ];
}

export default parseOBJ;