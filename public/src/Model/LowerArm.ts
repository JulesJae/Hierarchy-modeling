import Part from "./Part";
import Config from "../Config";
import { rotatez, rotatex, rotatey, scale, translate } from "../Tools/3DMatrix";

const { model } = Config;
const { lowerArm, upperArm } = model;

class LeftLower extends Part {

  constructor(name: string, part: Part) {
    super(name, part);
    // this.parentToLocal = translate((upperArm.width - lowerArm.width) / 2, -(upperArm.height / 2), 0.);
    this.parentToLocal = translate(0, -(upperArm.height / 2), 0.);
    this.localTranslate = translate(0, -lowerArm.height / 2, 0);
    this.localScale = scale(lowerArm.width, lowerArm.height, lowerArm.depth);
    // this.localRotate = rotatez(43);
    this.color = lowerArm.color;
  }
}

export default LeftLower;