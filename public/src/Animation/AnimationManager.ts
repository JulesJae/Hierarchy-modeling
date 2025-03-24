import Animation from "./Animation";

class AnimationManager {
  private current: Animation;
  private selected: Animation;
  private animations: Map<string, Animation>;

  constructor(initState: Animation) {
    this.animations = new Map();
    this.animations.set(initState.getName(), initState);
    this.current = initState;
    this.selected = initState;
  }

  add(animation: Animation) {
    this.animations.set(animation.getName(), animation);
  }

  play(t: number) {
    if (this.current !== this.selected) {
      console.log(`current isfinish: ${this.current.isFinish()}, selected can start: ${this.selected.canStart(t)}`)
      if(this.current.isFinish() && this.selected.canStart(t)) {
        this.selected.start();
        this.current = this.selected;
      }
    }

    this.current.animate(t);
  }

  switch(animationName: string) {
    if (!this.animations.has(animationName)) return;

    const animation = this.animations.get(animationName) as Animation;

    this.selected = animation;
    this.current.stop();
  }


}

export default AnimationManager;