import Part from "./Part";
import Config from "../Config";
import { scale, translate } from "../Tools/3DMatrix";

const { model } = Config;
const { head, torse } = model;

class Head extends Part {

  constructor(part?: Part) {
    super("head", part);
    this.parentToLocal = translate(0., torse.height / 2, 0.)
    this.localScale = scale(head.width, head.height, head.depth);
    this.localTranslate = translate(0., head.height / 2, 0.);
    this.color = head.color;
  }
}

export default Head;