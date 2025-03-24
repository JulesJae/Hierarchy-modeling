import Part from "./Part";
import Config from "../Config";
import { rotatez, rotatex, scale, translate } from "../Tools/3DMatrix";

const { model } = Config;
const { upperArm, torse } = model;

class RightUpperArm extends Part {

  constructor(part: Part) {
    super("rightUpperArm", part);
    this.parentToLocal = translate(-(torse.width * 0.5), torse.height / 2 * .9, 0);
    this.localTranslate = translate(-upperArm.width / 2, -upperArm.height / 2, 0);
    this.localScale = scale(upperArm.width, upperArm.height, upperArm.depth);
    this.color = upperArm.color;
    // this.localRotate = rotatez(45);
  }
}

export default RightUpperArm;