import { scale } from "../../Tools/3DMatrix";

function generateSphere(radius: number, stacks: number, slices: number): number[] {
  const ret = [] as number[];

  for (let i = 0; i <= stacks; i++) {
    const phi = (i * Math.PI) / stacks;
    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);

    for (let j = 0; j <= slices; j++) {
      const theta = (j * 2 * Math.PI) / slices;
      const cosTheta = Math.cos(theta);
      const sinTheta = Math.sin(theta);
      const x = radius * sinPhi * sinTheta;
      const y = radius * cosPhi;
      const z = radius * cosTheta * sinPhi;

      console.log(`x: ${x}, y: ${y}, z: ${z}`);
      ret.push(x, y, z);
      // console.log(`i =${i}, j = ${j}`);
    }
  }

  return ret;
}

function getVertexIndices(stacks: number, slices: number) {
  const ret = [] as number[];

  for (let i = 0; i < stacks; i++) {
    for (let j = 0; j < slices; j++) {
      const first = i * (slices + 1) + j;
      const second = first + slices + 1;

      ret.push(first, second, second + 1);//first triangle
      ret.push(second + 1, first + 1, first)//second triangle
    }
  }
  return ret;
}

export function getSphereGeometry(radius: number, stacks: number, slices: number) {
  const vertex = generateSphere(radius, stacks, slices);
  const indices = getVertexIndices(stacks, slices);
  const geometry = [] as number[];

  console.log(vertex);
  console.log(indices);
  indices.forEach((i) => {
    const start = i * 3;
    
    geometry.push(vertex[start], vertex[start + 1], vertex[start + 2]);
  });

  console.log(geometry);
  return geometry;
}



console.log(getSphereGeometry(1, 2, 4));