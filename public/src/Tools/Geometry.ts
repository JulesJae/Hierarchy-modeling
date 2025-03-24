import { Bound } from "../lib/Geometry/Bound";

export function setRectangle(gl: WebGLRenderingContext, x, y, width, height) {
  const geometry = [
    x, y,
    x + width, y,
    x, y + height,
    x+width, y+height,
    x, y + height,
    x+width, y
  ];

  console.log(geometry);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry), gl.STATIC_DRAW);
}

export function colorTriedre(gl: WebGLRenderingContext) {
  const colors = [
    //Rouge
    255, 0, 0,
    255, 0, 0,
    255, 0, 0,

    //Vert
    0, 255, 0,
    0, 255, 0,
    0, 255, 0,

    //Bleu
    0, 0, 255,
    0, 0, 255,
    0, 0, 255,

    //jaune
    255, 255, 0,
    255, 255, 0,
    255, 255, 0
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(colors), gl.STATIC_DRAW);
}

export function colorCube(gl: WebGLRenderingContext) {
  const colors = [
    //ABCD -> Face avant Rouge
    255, 0, 0,
    255, 0, 0,
    255, 0, 0,
    255, 0, 0,
    255, 0, 0,
    255, 0, 0,

    //GHCD -> Face Sol _ jaune
    255, 255, 0,
    255, 255, 0,
    255, 255, 0,
    255, 255, 0,
    255, 255, 0,
    255, 255, 0,

    //BFDH -> Face Droit _ vert
    0, 255, 255,
    0, 255, 255,
    0, 255, 255,
    0, 255, 255,
    0, 255, 255,
    0, 255, 255,

    //AEGC -> Face Gauche _ Bleu
    0, 0, 255,
    0, 0, 255,
    0, 0, 255,
    0, 0, 255,
    0, 0, 255,
    0, 0, 255,

    //EFGH -> Face Dos _ Noir
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,

    //Haut _ Orange
    255, 165, 0,
    255, 165, 0,
    255, 165, 0,
    255, 165, 0,
    255, 165, 0,
    255, 165, 0,

  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(colors), gl.STATIC_DRAW);
}

export function setCube(gl: WebGLRenderingContext) {
  const geometry = [
    //ABCD -> Face avant
    // - Premier triangle CCW
    0, 0, 0,
    0, 1, 0,
    1, 0, 0,
    //- Deuxieme triangles CCW
    1, 1, 0,
    1, 0, 0,
    0, 1, 0,

    //GHCD -> Face Sol
    // - Premier triangle CW
    0, 1, 1,
    1, 1, 1,
    0, 1, 0,
    //- Deuxieme triangles CW
    1, 1, 0,
    0, 1, 0,
    1, 1, 1,

    //BFDH -> Face Droit
    // - Premier triangle CCW
    1, 0, 0,
    1, 1, 0,
    1, 0, 1,
    //- Deuxieme triangles CCW
    1, 1, 1,
    1, 0, 1,
    1, 1, 0,

    //AEGC -> Face Gauche
    // - Premier triangle CCW
    0, 0, 1,
    0, 1, 1,
    0, 0, 0,
    //- Deuxieme triangles CCW
    0, 1, 0,
    0, 0, 0,
    0, 1, 1,

    //EFGH -> Face Dos
    // - Premier triangle CW
    0, 0, 1,
    1, 0, 1,
    0, 1, 1,
    //- Deuxieme triangles CW
    1, 1, 1,
    0, 1, 1,
    1, 0, 1,

    //ABEF -> Face Haut
    // - Premier triangle CCW
    0, 0, 1,
    0, 0, 0,
    1, 0, 1,
    //- Deuxieme triangles CCW
    1, 0, 0,
    1, 0, 1,
    0, 0, 0,

  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry), gl.STATIC_DRAW);
}

export function getCubeO() { 
  const geometry = [
    //ABCD -> Face avant
    // - Premier triangle CCW
    0, 0, 0,
    0, 1, 0,
    1, 0, 0,
    //- Deuxieme triangles CCW
    1, 1, 0,
    1, 0, 0,
    0, 1, 0,

    //GHCD -> Face Sol
    // - Premier triangle CW
    0, 1, 1,
    1, 1, 1,
    0, 1, 0,
    //- Deuxieme triangles CW
    1, 1, 0,
    0, 1, 0,
    1, 1, 1,

    //BFDH -> Face Droit
    // - Premier triangle CCW
    1, 0, 0,
    1, 1, 0,
    1, 0, 1,
    //- Deuxieme triangles CCW
    1, 1, 1,
    1, 0, 1,
    1, 1, 0,

    //AEGC -> Face Gauche
    // - Premier triangle CCW
    0, 0, 1,
    0, 1, 1,
    0, 0, 0,
    //- Deuxieme triangles CCW
    0, 1, 0,
    0, 0, 0,
    0, 1, 1,

    //EFGH -> Face Dos
    // - Premier triangle CW
    0, 0, 1,
    1, 0, 1,
    0, 1, 1,
    //- Deuxieme triangles CW
    1, 1, 1,
    0, 1, 1,
    1, 0, 1,

    //ABEF -> Face Haut
    // - Premier triangle CCW
    0, 0, 1,
    0, 0, 0,
    1, 0, 1,
    //- Deuxieme triangles CCW
    1, 0, 0,
    1, 0, 1,
    0, 0, 0,

  ];

  return geometry;
}

export function getCube() { 
  const geometry = [
    //ABCD -> Face avant
    // - Premier triangle CCW
    -0.5, 0.5, 0.5,
    0.5, .5, 0.5,
    -.5, -.5, 0.5,
    //- Deuxieme triangles CCW
    .5, -.5, 0.5,
    -.5, -.5, 0.5,
    0.5, .5, 0.5,

    //GHCD -> Face Sol
    // - Premier triangle CCW
    -0.5, -0.5, -0.5,
    0.5, -.5, -0.5,
    -.5, -.5, 0.5,
    //- Deuxieme triangles CCW
    .5, -.5, 0.5,
    -.5, -.5, 0.5,
    0.5, -.5, -0.5,

    //BFDH -> Face Droit
    // - Premier triangle CCW
    0.5, 0.5, 0.5,
    0.5, .5, -0.5,
    .5, -.5, 0.5,
    //- Deuxieme triangles CCW
    .5, -.5, -0.5,
    .5, -.5, 0.5,
    0.5, .5, -0.5,

    //AEGC -> Face Gauche
    // - Premier triangle CCW
    -0.5, 0.5, 0.5,
    -0.5, .5, -0.5,
    -.5, -.5, 0.5,
    //- Deuxieme triangles CCW
    -.5, -.5, -0.5,
    -.5, -.5, 0.5,
    -0.5, .5, -0.5,

    //EFGH -> Face Dos
    // - Premier triangle CCW
    -0.5, 0.5, -0.5,
    0.5, .5, -0.5,
    -.5, -.5, -0.5,
    //- Deuxieme triangles CCW
    .5, -.5, -0.5,
    -.5, -.5, -0.5,
    0.5, .5, -0.5,

    //ABEF -> Face Haut
    // - Premier triangle CCW
    -0.5, 0.5, -0.5,
    0.5, .5, -0.5,
    -.5, .5, 0.5,
    //- Deuxieme triangles CCW
    .5, .5, 0.5,
    -.5, .5, 0.5,
    0.5, .5, -0.5,

  ];

  return geometry;
}

export function setTriedre(gl: WebGLRenderingContext) {
  const geometry = [
    //ABC -> Base
    0, 40, 0,
    40, 40, 0,
    20, 40, 40,

    //ACD -> Gauche
    0, 40, 0,
    20, 40, 40,
    20, 0, 20,

    //BCD -> droite
    40, 40, 0,
    20, 40, 40,
    20, 0, 20,

    //ABD -> Face
    0, 40, 0,
    20, 0, 20,
    40, 40, 0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry), gl.STATIC_DRAW);
}

export function setF(gl: WebGLRenderingContext) {
  const width = 100;
  const height = 150;
  const thickness = 30;
  const geometry = [
    0, 0,
    30, 0,
    0, 0 + height,
    0 + thickness, 0 + height,
    0, 0 + height,
    30, 0,

    0 + thickness, 0,
    0  + width, 0,
    0 + thickness, 0 + thickness,
    0 + width, 0 + thickness,
    0 + thickness, 0 + thickness,
    0 + width, 0,

    0 + thickness, 0 + thickness * 2,
    0 + width * 2 / 3, 0 + thickness * 2,
    0 + thickness, 0 + thickness * 3,
    0 + width * 2 / 3, 0 + thickness * 3,
    0 + thickness, 0 + thickness * 3,
    0 + width * 2 / 3, 0 + thickness * 2
  ];
  
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry), gl.STATIC_DRAW);
}

export function set3DFColor(gl: WebGLRenderingContext) {
  const colors = [
       // left column front
       200,  70, 120,
       200,  70, 120,
       200,  70, 120,
       200,  70, 120,
       200,  70, 120,
       200,  70, 120,

         // top rung front
       200,  70, 120,
       200,  70, 120,
       200,  70, 120,
       200,  70, 120,
       200,  70, 120,
       200,  70, 120,

         // middle rung front
       200,  70, 120,
       200,  70, 120,
       200,  70, 120,
       200,  70, 120,
       200,  70, 120,
       200,  70, 120,

         // left column back
       80, 70, 200,
       80, 70, 200,
       80, 70, 200,
       80, 70, 200,
       80, 70, 200,
       80, 70, 200,

         // top rung back
       80, 70, 200,
       80, 70, 200,
       80, 70, 200,
       80, 70, 200,
       80, 70, 200,
       80, 70, 200,

         // middle rung back
       80, 70, 200,
       80, 70, 200,
       80, 70, 200,
       80, 70, 200,
       80, 70, 200,
       80, 70, 200,

         // top
       70, 200, 210,
       70, 200, 210,
       70, 200, 210,
       70, 200, 210,
       70, 200, 210,
       70, 200, 210,

         // top rung right
       200, 200, 70,
       200, 200, 70,
       200, 200, 70,
       200, 200, 70,
       200, 200, 70,
       200, 200, 70,

         // under top rung
       210, 100, 70,
       210, 100, 70,
       210, 100, 70,
       210, 100, 70,
       210, 100, 70,
       210, 100, 70,

         // between top rung and middle
       210, 160, 70,
       210, 160, 70,
       210, 160, 70,
       210, 160, 70,
       210, 160, 70,
       210, 160, 70,

         // top of middle rung
       70, 180, 210,
       70, 180, 210,
       70, 180, 210,
       70, 180, 210,
       70, 180, 210,
       70, 180, 210,

         // right of middle rung
       100, 70, 210,
       100, 70, 210,
       100, 70, 210,
       100, 70, 210,
       100, 70, 210,
       100, 70, 210,

         // bottom of middle rung.
       76, 210, 100,
       76, 210, 100,
       76, 210, 100,
       76, 210, 100,
       76, 210, 100,
       76, 210, 100,

         // right of bottom
       140, 210, 80,
       140, 210, 80,
       140, 210, 80,
       140, 210, 80,
       140, 210, 80,
       140, 210, 80,

         // bottom
       90, 130, 110,
       90, 130, 110,
       90, 130, 110,
       90, 130, 110,
       90, 130, 110,
       90, 130, 110,

         // left side
       160, 160, 220,
       160, 160, 220,
       160, 160, 220,
       160, 160, 220,
       160, 160, 220,
       160, 160, 220
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(colors), gl.STATIC_DRAW);
}

export function set3DF(gl: WebGLRenderingContext) {
  const geometry = get3DF();
  
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry), gl.STATIC_DRAW);
}

export function setFTextureO(gl: WebGLRenderingContext) {
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      // left column front
      38 / 255,  44 / 255,
      38 / 255, 223 / 255,
     113 / 255,  44 / 255,
      38 / 255, 223 / 255,
     113 / 255, 223 / 255,
     113 / 255,  44 / 255,

     // top rung front
     113 / 255, 44 / 255,
     113 / 255, 85 / 255,
     218 / 255, 44 / 255,
     113 / 255, 85 / 255,
     218 / 255, 85 / 255,
     218 / 255, 44 / 255,

     // middle rung front
     113 / 255, 112 / 255,
     113 / 255, 151 / 255,
     203 / 255, 112 / 255,
     113 / 255, 151 / 255,
     203 / 255, 151 / 255,
     203 / 255, 112 / 255,

     // left column back
      38 / 255,  44 / 255,
     113 / 255,  44 / 255,
      38 / 255, 223 / 255,
      38 / 255, 223 / 255,
     113 / 255,  44 / 255,
     113 / 255, 223 / 255,

     // top rung back
     113 / 255, 44 / 255,
     218 / 255, 44 / 255,
     113 / 255, 85 / 255,
     113 / 255, 85 / 255,
     218 / 255, 44 / 255,
     218 / 255, 85 / 255,

     // middle rung back
     113 / 255, 112 / 255,
     203 / 255, 112 / 255,
     113 / 255, 151 / 255,
     113 / 255, 151 / 255,
     203 / 255, 112 / 255,
     203 / 255, 151 / 255,

       // top
       0, 0,
       1, 0,
       1, 1,
       0, 0,
       1, 1,
       0, 1,

       // top rung right
       0, 0,
       1, 0,
       1, 1,
       0, 0,
       1, 1,
       0, 1,

       // under top rung
       0, 0,
       0, 1,
       1, 1,
       0, 0,
       1, 1,
       1, 0,

       // between top rung and middle
       0, 0,
       1, 1,
       0, 1,
       0, 0,
       1, 0,
       1, 1,

       // top of middle rung
       0, 0,
       1, 1,
       0, 1,
       0, 0,
       1, 0,
       1, 1,

       // right of middle rung
       0, 0,
       1, 1,
       0, 1,
       0, 0,
       1, 0,
       1, 1,

       // bottom of middle rung.
       0, 0,
       0, 1,
       1, 1,
       0, 0,
       1, 1,
       1, 0,

       // right of bottom
       0, 0,
       1, 1,
       0, 1,
       0, 0,
       1, 0,
       1, 1,

       // bottom
       0, 0,
       0, 1,
       1, 1,
       0, 0,
       1, 1,
       1, 0,

       // left side
       0, 0,
       0, 1,
       1, 1,
       0, 0,
       1, 1,
       1, 0
  ]), gl.STATIC_DRAW);
}

/**
 * @desc methode naive pour appliquer une texture en projetant les sommets sur le plan XY et utiliser ces coordonnees normalises pour generer les uvs
 * @param gl 
 */
export function setFTexture(gl: WebGLRenderingContext) {
  const geometry = get3DF();
  const bound = new Bound(geometry).getBbox();
  const uvs = [] as number[];

  for (let i = 0; i < geometry.length; i += 3) {
    const x = geometry[i];
    const y = geometry[i + 1];

    uvs.push(x * 2 / bound.width, y * 2 / bound.height);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
}

export function get3DF() {
  return [
     // left column front
     0,   0,  0,
     0, 150,  0,
     30,   0,  0,
     0, 150,  0,
     30, 150,  0,
     30,   0,  0,

     // top rung front
     30,   0,  0,
     30,  30,  0,
     100,   0,  0,
     30,  30,  0,
     100,  30,  0,
     100,   0,  0,

     // middle rung front
     30,  60,  0,
     30,  90,  0,
     67,  60,  0,
     30,  90,  0,
     67,  90,  0,
     67,  60,  0,

     // left column back
       0,   0,  30,
      30,   0,  30,
       0, 150,  30,
       0, 150,  30,
      30,   0,  30,
      30, 150,  30,

     // top rung back
      30,   0,  30,
     100,   0,  30,
      30,  30,  30,
      30,  30,  30,
     100,   0,  30,
     100,  30,  30,

     // middle rung back
      30,  60,  30,
      67,  60,  30,
      30,  90,  30,
      30,  90,  30,
      67,  60,  30,
      67,  90,  30,

     // top
       0,   0,   0,
     100,   0,   0,
     100,   0,  30,
       0,   0,   0,
     100,   0,  30,
       0,   0,  30,

     // top rung right
     100,   0,   0,
     100,  30,   0,
     100,  30,  30,
     100,   0,   0,
     100,  30,  30,
     100,   0,  30,

     // under top rung
     30,   30,   0,
     30,   30,  30,
     100,  30,  30,
     30,   30,   0,
     100,  30,  30,
     100,  30,   0,

     // between top rung and middle
     30,   30,   0,
     30,   60,  30,
     30,   30,  30,
     30,   30,   0,
     30,   60,   0,
     30,   60,  30,

     // top of middle rung
     30,   60,   0,
     67,   60,  30,
     30,   60,  30,
     30,   60,   0,
     67,   60,   0,
     67,   60,  30,

     // right of middle rung
     67,   60,   0,
     67,   90,  30,
     67,   60,  30,
     67,   60,   0,
     67,   90,   0,
     67,   90,  30,

     // bottom of middle rung.
     30,   90,   0,
     30,   90,  30,
     67,   90,  30,
     30,   90,   0,
     67,   90,  30,
     67,   90,   0,

     // right of bottom
     30,   90,   0,
     30,  150,  30,
     30,   90,  30,
     30,   90,   0,
     30,  150,   0,
     30,  150,  30,

     // bottom
     0,   150,   0,
     0,   150,  30,
     30,  150,  30,
     0,   150,   0,
     30,  150,  30,
     30,  150,   0,

     // left side
     0,   0,   0,
     0,   0,  30,
     0, 150,  30,
     0,   0,   0,
     0, 150,  30,
     0, 150,   0
  ];
}

