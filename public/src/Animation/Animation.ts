import HumanRobot from "../HumanRobot";
import AnimationClip, { IndicesAndRatio } from "./AnimationClip";

/**
 * @desc This class is used to store multiple AnimationClips
 * It has three different state: start, stop and finish (we can have latter paused)
 * start: the animation is running
 * stopped: A new animation has been called but we have to wait this one to to finish
 * finish: the animation has retrieve initial state or states defined
 * 
 * Transition is made By AnimationManager class
 *
 */
class Animation {
  protected hr: HumanRobot;
  protected animations: Map<string, AnimationClip[]>;
  protected name: string;
  protected _stop: boolean;
  protected finish: boolean;
  protected timeframe: number[];

  constructor(name: string, hr: HumanRobot) {
    this.hr = hr;
    this.animations = new Map();
    this._stop = false;
    this.finish = false;
    this.name = name;
  }

  getName() { return this.name; }

  /**
   * @desc Retourne l'interval d'indices inferieur et superieur au temps t dans le tableau de temps ainsi que le ratio.
   * @param t - time in milliseconds
   * @returns 
   */
  getIndicesAndRatio(t: number): IndicesAndRatio {
    const timeInCs = Math.floor(t / 10);
    const timeFrameInCs = this.timeframe.map((e) => e * 100);
    const clippedTime = timeInCs % timeFrameInCs[timeFrameInCs.length - 1];
    const end = timeFrameInCs.findIndex((e) => e > clippedTime);
    const start = end - 1;
    const ratio = (clippedTime - timeFrameInCs[start]) / (timeFrameInCs[end] - timeFrameInCs[start])

    // console.log(ratio);
    return {
      start, end, ratio
    }
  }

  animate(t: number) {
    this.isStopped(t);

    if (this.finish) return;

    const ser = this.getIndicesAndRatio(t);


    this.traverseClips(clip => clip.play(ser));
  }

  protected addClip(id: string, clip: AnimationClip) {
    if (!this.animations.has(id))
      this.animations.set(id, []);

    this.animations.get(id)?.push(clip);
  }

  protected traverseClips(handler: (clip: AnimationClip) => void) {
    this.animations.forEach(clip => clip.forEach(handler));
  }

  
  start() { 
    this._stop = false;
    this.finish = false;
  }
  
  canStart(t: number): boolean {
    const ser = this.getIndicesAndRatio(t);
    
    return ser.start === 0 && ser.ratio <= 0.1;
  }
  
  stop() { this._stop = true; }
  
  isFinish() { return this.finish; }

  /**
   * @desc test if Animation is on stop state, if yes check for finish it
   * @param t 
   * @returns 
   */
  private isStopped(t: number) {
    if(!this._stop) return;

    const currentCs = Math.floor(t / 10)
    const maxTimeAnimation = this.timeframe[this.timeframe.length - 1] * 100;

    if (currentCs % maxTimeAnimation < 20) {
      this.traverseClips(clip => clip.stop());
      this.finish = true;
    }
  }

  protected initClips() {
    this.hr.traverse((p) => {
      const name = p.getName();
      const clips = this.animations.get(name);

      if (clips) 
        clips.forEach(clip => clip.setPart(p));
      
    });
  }

}

export default Animation;