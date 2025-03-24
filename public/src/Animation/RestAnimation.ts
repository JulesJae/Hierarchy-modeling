import HumanRobot from "../HumanRobot";
import Animation from "./Animation";

class RestAnimation extends Animation {

  constructor(hr: HumanRobot) {
    super("Rest", hr)
    // this.timeframe = [1];
    this.finish = true;
  }

  start(): void {
    this.finish = true;
  }

  stop(): void {
    this._stop = false;
  }

  canStart(t: number): boolean {
      return true;
  }
}

export default RestAnimation;