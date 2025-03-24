import AnimationClip, { IndicesAndRatio, KeyFrame } from "./AnimationClip";

class TranslationAnimationClip extends AnimationClip {

  protected relativeValues: number[];
  protected currentIndice: number;

  constructor(kf: KeyFrame) {
    super(kf);
    this.relativeValues = [];
  }

  play(ser: IndicesAndRatio): void {
      this.start();

      (this.part[this.keyFrames.methodName] as (number) => void)(this.interpolate(ser.start, ser.end, ser.ratio))
  }

  protected getValue(idx: number) {
    return this.relativeValues[idx];
  }

  protected start(): void {
    if (!this.stopped) return;

    super.start();
    console.log(`TranslationAnimationClip start`);
    this.calculateRelativePosition();
  }

  private calculateRelativePosition(): void {
    const getter = this.keyFrames.methodName.replace("set", "get");

    const position = this.part[getter]();
    
    this.keyFrames.valueFrame.reduce((prev, curr) => {
      const relativePosition = prev + curr;

      this.relativeValues.push(relativePosition);
      return relativePosition;
    }, position);
    console.log(`this.relativeValues`, this.relativeValues);
    console.log(`this.keyFrames.valueFrame`, this.keyFrames.valueFrame);
  }

}

export default TranslationAnimationClip;