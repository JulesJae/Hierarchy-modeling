import { MaterialGroup, MyOBJ, ParsedOBJ, WebglMesh, WebglPrimitives, WebglVertexData } from "../type/type";

export const parsingType: WebglPrimitives = WebglPrimitives.LINE;

let geometry: WebglMesh | undefined;
let material = "default";
let geometries: WebglMesh[] = [];
let webglVertexData;
let objVertexData: number[][][];
let positions = [] as [number, number, number][];
let normals = [] as [number, number][];
let textCoord = [] as [number, number][];
let materialGroups: MaterialGroup[]

// function newGeometry() {
//   if (geometry && geometry.data.positions.length) 
//     geometry = undefined;
// }

// function setGeometry() {
//   if (geometry) return;

//   const positions = [];
//   const textCoord = []
//   const normals = [];

//   webglVertexData = [
//     positions,
//     textCoord,
//     normals
//   ];
//   geometry = {
//     material,
//     data: {
//       positions,
//       textCoord,
//       normals
//     }
//   };
//   geometries.push(geometry);
// }

const facesOperations = {
  line: (parts) => {
    const numLines = parts.length;
    
    for (let i = 0; i < numLines; i++) {
      addVertex(parts[i]);
      addVertex(parts[(i + 1) % numLines]);
    }
  },
  triangles: (parts) => {
    const numTriangles = parts.length - 2;
    for (let i = 0; i < numTriangles; i++) {
      addVertex(parts[0]);
      addVertex(parts[1 + i]);
      addVertex(parts[2 + i]);
    }
  }
};

function addVertex(faceVertex: string) {
  const ptn = faceVertex.split("/");

  ptn.forEach((e, i) => {
    if (!e) return;

    const objIndex = parseInt(e);
    const index = objIndex > 0 ? objIndex - 1: objVertexData[i].length + objIndex;

    webglVertexData[i].push(...objVertexData[i][index]);
  });
}


function parseOBJ(file: string, type: WebglPrimitives): MyOBJ {
  webglVertexData = [[], [], []] as any[];
  let mtllib;
  materialGroups = [];
  let materialGroupName: string;

  const keywords = {
    v: (parts) => positions.push(parts.map(parseFloat)),
    vn: (parts) => normals.push(parts.map(parseFloat)),
    vt: (parts) => textCoord.push(parts.map(parseFloat)),
    f: (parts, ) => {
      facesOperations[type](parts);
    },
    mtllib: (part) => { mtllib = part },
    usemtl: (part) => {
      materialGroupName = part;
      materialGroups[materialGroupName] = {} as MaterialGroup
    }
  };
  
  //same order as f indices: f v/vt/vn
  objVertexData = [positions, textCoord, normals];
  // const webglVertexData = [[], [], []] as any[];


  const keywordRE = /^(\w*)(?: )*(.*)$/;
  const lines = file.split("\n");

  lines.forEach((line, lineNb) => {
    line = line.trim()
    if (line === "" || line.startsWith("#")) return;
    
    const m = keywordRE.exec(line);

    if (!m) return;

    const [, keyword, unparsedArgs] = m;
    const parts = line.split(/\s+/).slice(1);
    const handler = keywords[keyword];

    console.log(`keyword: ${keyword}, unparsedArgs: `, unparsedArgs, "parts: ", parts);
    console.log(keywords[keyword]);

    handler && handler(parts, unparsedArgs);
    !handler && console.warn(`unhandled keyword: ${keyword}`);
  });

  return {
    mtllib,
    groups: materialGroups
  }
}

export default parseOBJ;