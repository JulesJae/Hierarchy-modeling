import Part from "./Part";
import Config from "../Config";
import { rotatez, rotatex, scale, translate } from "../Tools/3DMatrix";

const { model } = Config;
const { upperLeg, lowerLeg } = model;

class LowerLeg extends Part {

  constructor(name: string, part: Part) {
    super(name, part);
    this.parentToLocal = translate(0, -upperLeg.height / 2, 0);
    this.localTranslate = translate(0, -lowerLeg.height / 2, 0);
    this.localScale = scale(lowerLeg.width, lowerLeg.height, lowerLeg.depth);
    this.color = lowerLeg.color;
    this.localRotate = rotatex(0);
    // this.localRotate = rotatex(-90);
  }
}

export default LowerLeg;