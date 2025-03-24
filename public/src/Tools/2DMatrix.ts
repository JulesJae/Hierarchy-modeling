export function multiply2DMatrix(transform: number[], base: number[]) {
  return [
    transform[0] * base[0] + transform[3] * base[1] + transform[6] * base[2], transform[1] * base[0] + transform[4] * base[1] + transform[7] * base[2], transform[2] * base[0] + transform[5] * base[1] + transform[8] * base[2],
    transform[0] * base[3] + transform[3] * base[4] + transform[6] * base[5], transform[1] * base[3] + transform[4] * base[4] + transform[7] * base[5], transform[2] * base[3] + transform[5] * base[4] + transform[8] * base[5],
    transform[0] * base[6] + transform[3] * base[7] + transform[6] * base[8], transform[1] * base[6] + transform[4] * base[7] + transform[7] * base[8], transform[2] * base[6] + transform[5] * base[7] + transform[8] * base[8],
  ]
}

export function identite() {
  return [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ];
}

export function project2D(width: number, height: number): Array<number> {
  return [
    2 / width, 0, 0,
    0, -2 / height, 0,
    -1, 1, 1
  ];
}

export function scale(sx: number, sy: number): Array<number> {
  return [
    sx, 0, 0,
    0, sy, 0,
    0, 0, 1
  ];
}

export function rotate(angle: number, inRadian: boolean = false) {
  if (!inRadian)
    angle = (Math.PI / 180) * angle;
  return [
    Math.cos(angle), -Math.sin(angle), 0,
    Math.sin(angle), Math.cos(angle), 0,
    0, 0, 1
  ];
}

export function translate(tx: number, ty: number): Array<number> {
  return [
    1, 0, 0,
    0, 1, 0,
    tx, ty, 1
  ];
}