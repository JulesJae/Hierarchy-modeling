export function multiply3DMatrix(transform: number[], base: number[]) {
  var a00 = transform[0 * 4 + 0];
    var a01 = transform[0 * 4 + 1];
    var a02 = transform[0 * 4 + 2];
    var a03 = transform[0 * 4 + 3];
    var a10 = transform[1 * 4 + 0];
    var a11 = transform[1 * 4 + 1];
    var a12 = transform[1 * 4 + 2];
    var a13 = transform[1 * 4 + 3];
    var a20 = transform[2 * 4 + 0];
    var a21 = transform[2 * 4 + 1];
    var a22 = transform[2 * 4 + 2];
    var a23 = transform[2 * 4 + 3];
    var a30 = transform[3 * 4 + 0];
    var a31 = transform[3 * 4 + 1];
    var a32 = transform[3 * 4 + 2];
    var a33 = transform[3 * 4 + 3];
    var b00 = base[0 * 4 + 0];
    var b01 = base[0 * 4 + 1];
    var b02 = base[0 * 4 + 2];
    var b03 = base[0 * 4 + 3];
    var b10 = base[1 * 4 + 0];
    var b11 = base[1 * 4 + 1];
    var b12 = base[1 * 4 + 2];
    var b13 = base[1 * 4 + 3];
    var b20 = base[2 * 4 + 0];
    var b21 = base[2 * 4 + 1];
    var b22 = base[2 * 4 + 2];
    var b23 = base[2 * 4 + 3];
    var b30 = base[3 * 4 + 0];
    var b31 = base[3 * 4 + 1];
    var b32 = base[3 * 4 + 2];
    var b33 = base[3 * 4 + 3];
    return [
      b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
      b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
      b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
      b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
      b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
      b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
      b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
      b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
      b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
      b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
      b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
      b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
      b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
      b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
      b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
      b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
    ];
}

export function identite() {
  return [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
}

export function camera() {
  return [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, -1, 0,
    0, 0, 0, 1
  ];
}

export function project3DO(width: number, height: number, depth: number): Array<number> {
  return [
    2 / width, 0, 0, 0,
    0, -2 / height, 0, 0,
    0, 0, 2 / depth, 0,
    -1, 1, 0, 1
  ];
}

export function project3D(width: number, height: number, depth: number): Array<number> {
  return [
    1 / width, 0, 0, 0,
    0, 1 / height, 0, 0,
    0, 0, 1 / depth, 0,
    0, 0, 0, 1
  ];
}

export function orthogonalProjection(t: number, b: number, r: number, l: number, n: number, f: number, ar: number) {
  return [
    2 / ((r - l) * ar) , 0           , 0,     0,
    0           , 2 / (t - b) , 0 ,           0,
    0           , 0           , -2 / (f - n), 0,
    -(l+r)/(r-l), -(b+t)/(t-b), -(n+f)/(f-n), 1
  ]
}

export function perspectiveProjection(fov: number, ar: number, near: number, far: number) {
  const radianFov = (fov / 2) * Math.PI / 180;
  const top = Math.tan(radianFov) * near;
  const bottom = -top;
  const left = -top * ar;
  const right = top * ar;

  return [
    2 * near/ (right - left),         0,                               0,                               0,
    0,                                2 * near / (top - bottom),       0,                               0,
    (left + right) / (right - left),  (bottom + top) / (top - bottom), (far + near) / (near - far),     -1,
    0,                                0,                                2 * near * far / (near - far),  0,
  ]
}

export function scale(sx: number, sy: number, sz: number): Array<number> {
  return [
    sx, 0, 0, 0,
    0, sy, 0, 0,
    0, 0, sz, 0,
    0, 0, 0, 1
  ];
}

export function rotatez(angle: number, inRadian: boolean = false) {
  if (!inRadian)
    angle = (Math.PI / 180) * angle;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [
    cos, -sin, 0, 0,
    sin, cos, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
}

export function rotatey(angle: number, inRadian: boolean = false) {
  if (!inRadian)
    angle = (Math.PI / 180) * angle;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [
    cos, 0, -sin, 0,
    0, 1, 0, 0,
    sin, 0, cos, 0,
    0, 0, 0, 1
  ];
}

export function rotatex(angle: number, inRadian: boolean = false) {
  if (!inRadian)
    angle = (Math.PI / 180) * angle;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [
    1, 0, 0, 0,
    0, cos, sin, 0,
    0, -sin, cos, 0,
    0, 0, 0, 1
  ];
}

export function translate(tx: number, ty: number, tz: number): Array<number> {
  return [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    tx, ty, tz, 1
  ];
}

export function oneToTwoDMatrix(matrix: number[]): number[][] {
  const ret = [] as number[][];
  const size = Math.sqrt(matrix.length);

  for (let i = 0; i < size; i++) {
    const row = [] as number[];

    for (let j = 0; j < size; j++) {
      row.push(matrix[i * size + j]);
    }
    ret.push(row);
  }

  return ret;
}