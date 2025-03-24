import Part from "./Part";
import Config from "../Config";
import { rotatez, rotatex, scale, translate } from "../Tools/3DMatrix";

const { model } = Config;
const { upperLeg, torse } = model;

class RightUpperLeg extends Part {

  constructor(part: Part) {
    super("rightUpperLeg", part);
    this.parentToLocal = translate(-torse.width / 4, -torse.height / 2, 0);
    this.localTranslate = translate(0, -upperLeg.height / 2, 0);
    this.localScale = scale(upperLeg.width, upperLeg.height, upperLeg.depth);
    this.color = upperLeg.color;
    this.localRotate = rotatex(0);
    // this.localRotate = rotatex(-90);
  }
}

export default RightUpperLeg;