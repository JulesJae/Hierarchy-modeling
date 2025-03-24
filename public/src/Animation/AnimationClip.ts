import Part from "../Model/Part";

export type KeyFrame = {
  // timeFrame: number[],
  valueFrame: number[],
  methodName: string
}

export type IndicesAndRatio = {
  ratio: number,
  start: number,
  end: number
}

class AnimationClip {

  protected keyFrames: KeyFrame;
  protected arr: number[];
  protected stopped: boolean;
  protected part: Part;

  constructor(kf: KeyFrame) {
    this.keyFrames = kf;
    this.arr = [];
    this.stopped = true;
  }

  public setPart(p: Part) {
    this.part = p;
  }



  play(ser: IndicesAndRatio) {
    this.start();

    (this.part[this.keyFrames.methodName] as (number) => void)(this.interpolate(ser.start, ser.end, ser.ratio));
  }

  /**
   * @desc Stop animation and restore initial state
   * @param p 
   */
  stop() {
    this.stopped = true;
    (this.part[this.keyFrames.methodName] as (number) => void)(this.getValue(0));
  }

  protected start() {
    if (!this.stopped) return;

    this.stopped = false
  }

  protected getValue(idx: number): number {
    // console.log(`this.getValue  animationclip`);
    return this.keyFrames.valueFrame[idx];
  }


  protected interpolate(startIdx, endIdx, ratio): number {
    const startValue = this.getValue(startIdx);
    const endValue = this.getValue(endIdx);

    // console.log(`startValue = ${startValue}, endValue = ${endValue}, ratio = ${ratio}`)
    // console.log("interpolate value = " + (startValue * (1 - ratio) + endValue * ratio));
    return startValue * (1 - ratio) + endValue * ratio;
  }

}

export default AnimationClip;