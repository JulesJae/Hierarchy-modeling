import Part from "./Part";
import Config from "../Config";
import { identite, scale, translate } from "../Tools/3DMatrix";

const { model } = Config;
const { torse } = model;

class Torse extends Part {

  constructor(part?: Part) {
    super("torse", part);
    this.localScale = scale(torse.width, torse.height, torse.depth);
    this.localTranslate = translate(0, torse.height / 2, 0);
    this.color = torse.color;
    console.log(`torso Y = ${this.getY()}`);
    // this.restPose = { x: 0, y: torse.height / 2, z: 0 };
  }
}

export default Torse;