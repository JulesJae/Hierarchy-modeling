import HumanRobot from "../HumanRobot";
import AnimationClip, { KeyFrame } from "./AnimationClip";
import Animation from "./Animation";

class RunAnimation extends Animation {

  constructor(hr: HumanRobot) {
    super("Run", hr)
    this.timeframe = [0, .35, 1.05, 1.4];
    const leftUpper: KeyFrame = {
      methodName: 'rotatex',
      valueFrame: [0, 45, -45, 0]
    }
    const rightUpper: KeyFrame = {
      methodName: 'rotatex',
      valueFrame: [0, -45, 45, 0]
    }
    const leftLowerArm: KeyFrame = {
      methodName: 'rotatex',
      valueFrame: [0, 35, 15, 0]
    }
    const rightLowerArm: KeyFrame = {
      methodName: 'rotatex',
      valueFrame: [0, 15, 35, 0]
    }
    const lowerLeg: KeyFrame = {
      methodName: 'rotatex',
      valueFrame: [0, -25, -15, 0]
    }
    const leftAnimationClips = new AnimationClip(leftUpper);
    const lowerAnimationClips = new AnimationClip(leftLowerArm);
    const rightAnimationClips = new AnimationClip(rightUpper);
    const rightLowerAnimationClips = new AnimationClip(rightLowerArm);
    const rightUpperLegAnimationClips = new AnimationClip(leftUpper);
    const leftUpperLegAnimationClips = new AnimationClip(rightUpper);

    this.addClip("leftUpperArm", leftAnimationClips);
    this.addClip("leftLowerArm", lowerAnimationClips);
    this.addClip("rightUpperArm", rightAnimationClips);
    this.addClip("rightLowerArm", rightLowerAnimationClips);
    this.addClip("rightUpperLeg", rightUpperLegAnimationClips);
    this.addClip("leftUpperLeg", leftUpperLegAnimationClips);
    this.addClip("leftLowerLeg", new AnimationClip(lowerLeg));
    this.addClip("rightLowerLeg", new AnimationClip(lowerLeg));

    this.initClips();
  }

  canStart(t: number): boolean {
    const { start, ratio } = this.getIndicesAndRatio(t);
    
    if (start == 0 && ratio <= .15) return true;
    if (start === 1 && (ratio > .45  && ratio < .65)) return true;
    return false;
  }
}

export default RunAnimation;