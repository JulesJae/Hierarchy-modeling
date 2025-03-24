import HumanRobot from "../HumanRobot";
import AnimationClip, { KeyFrame } from "./AnimationClip";
import Animation from "./Animation";
import Config from "../Config";
import TranslationAnimationClip from "./TranslationAnimationClip";

const upperLegHeight = Config.model.upperLeg.height;
const lowerLegHeight = Config.model.lowerLeg.height;
const legHeight = upperLegHeight + lowerLegHeight;
const distanceLoss = legHeight - (upperLegHeight * Math.sin(85/180 * Math.PI) + lowerLegHeight * Math.sin(-85/180 * Math.PI));

class JumpAnimation extends Animation {

  constructor(hr: HumanRobot) {
    super("Jump", hr)
    // this.timeframe = [0, .35, .7, 1., 1.4];
    this.timeframe = [0, .35, .7, 1.2];

    const upperLeg: KeyFrame = {
      methodName: 'rotatex',
      valueFrame: [0, 85, 0, 0, 0]
    }
    const lowerLeg: KeyFrame = {
      methodName: 'rotatex',
      valueFrame: [0, -85, 0, 0, 0 ]
    }
    const upperArm: KeyFrame = {
      methodName: 'rotatex',
      valueFrame: [0, -90, 160, 0]
    }
    const torseRotation: KeyFrame = {
      methodName: 'rotatex',
      valueFrame: [0, -35, 0, 0]
    }
    const torsoTranslation: KeyFrame = {
      methodName: 'setY',
      valueFrame: [0, -.7, +2,  -1.3 ]
    };

    this.addClip("leftUpperArm", new AnimationClip(upperArm));
    this.addClip("rightUpperArm", new AnimationClip(upperArm));
    this.addClip("rightUpperLeg", new AnimationClip(upperLeg));
    this.addClip("leftUpperLeg", new AnimationClip(upperLeg));
    this.addClip("leftLowerLeg", new AnimationClip(lowerLeg));
    this.addClip("rightLowerLeg", new AnimationClip(lowerLeg));
    this.addClip("torse", new TranslationAnimationClip(torsoTranslation));
    this.addClip("torse", new AnimationClip(torseRotation));

    this.initClips();
  }
}

export default JumpAnimation;