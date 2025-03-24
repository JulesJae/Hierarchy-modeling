const TORSE_WIDTH = 1.5;
const TORSE_HEIGHT = 2;
const TORSE_DEPTH = 0.5;
// const TORSE_DEPTH = 2;

const chairColor = [.996, .7647, .6745];
const tshirt = [0.43921, 0.55294, 0.1372549];
const pantalon = [0.70196, 0.40392, .0];

export default {
  model: {
    torse: {
      width: TORSE_WIDTH,
      height: TORSE_HEIGHT,
      depth: TORSE_DEPTH,
      // color: [.5, 0.9, .035]
      color: tshirt
    },
    head: {
      width: TORSE_WIDTH / 3,
      height:  TORSE_WIDTH / 3,
      depth: TORSE_DEPTH * .9,
      color: chairColor
    },
    upperArm: {
      width: TORSE_WIDTH / 4,
      height: TORSE_HEIGHT / 2.15,
      depth: TORSE_DEPTH / 2,
      // color: [.7, 0.7, .7]
      color: tshirt
    },
    lowerArm: {
      width: TORSE_WIDTH / 9,
      height: TORSE_HEIGHT / 2.15,
      depth: TORSE_DEPTH / 2.5,
      color: chairColor
    },
    upperLeg: {
      width: TORSE_WIDTH / 3.5,
      height: TORSE_HEIGHT / 2,
      depth: TORSE_DEPTH/1.5,
      // color: [.7, 0.7, .7],
      color: pantalon
    },
    lowerLeg: {
      width: TORSE_WIDTH / 4,
      height: TORSE_HEIGHT / 2.15,
      depth: TORSE_DEPTH/1.7,
      // color: [.7, 0.7, .7]
      color: pantalon
    }
  }
}