import AnimationManager from "../Animation/AnimationManager";


class Manipulator {

  protected mouseMoveToken: string | null;
  protected animationManager: AnimationManager;
  protected gl: WebGLRenderingContext;
  protected handleClick: (x: number, y: number) => void;
  protected isDragging: boolean = false;

  protected downMouseX: number;
  protected downMouseY: number;
  
  mouseX: number;
  mouseY: number;

  constructor(gl: WebGLRenderingContext,animationManager: AnimationManager) {
    this.animationManager = animationManager
    this.gl = gl;
    this.mouseMoveToken = null;

    this.onMouseDownMove = this.onMouseDownMove.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClick = this.onClick.bind(this);

    this.initListeners();
  }

  protected initListeners() {
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));

    this.gl.canvas.addEventListener('mousemove', this.onMouseMove);
    // this.gl.canvas.addEventListener('click', this.onClick);
  }

  setHandleClick(handler: (x: number, y: number) => void) {
    this.handleClick = handler;
  }

  protected onClick() {
    if (this.handleClick) 
      this.handleClick(this.mouseX, this.mouseY);
  }

  protected onMouseUp(event: MouseEvent) {
    const dx = Math.abs(this.downMouseX - this.mouseX);
    const dy = Math.abs(this.downMouseY - this.mouseY);

    if (dx < 7 && dy < 7) {
      this.onClick();
    }
    if (event.button === 0) {
      document.removeEventListener('mousemove', this.onMouseDownMove);
    }

    this.isDragging = false;
  }

  protected onMouseMove(event: Event) {
    const myEvent = event as MouseEvent;
    const rect = (this.gl.canvas as HTMLCanvasElement).getBoundingClientRect();

    /*
      clientX et clientY sont les coordonnées du curseur dans le systeme de coordonnee du Viewport
      this.mouseX et this.mouseY sont les coordonnees du curseur dans le systeme de coordonnees du canvas
    */
    this.mouseX = myEvent.clientX - rect.left;
    this.mouseY = myEvent.clientY - rect.top;
    this.isDragging = true;
  }


  protected onKeyDown(event: KeyboardEvent) {
    switch(event.key) {
      case "r":
        this.animationManager.switch("Rest");
        return;

      case "w":
        this.animationManager.switch("Run");
        return;

      case "j":
        this.animationManager.switch("Jump");
        return;
    }
  }


  protected onMouseDown(event: MouseEvent) {
    switch(event.button) {
      case 0:
        this.onLeftMouseDown(event);
        break;
      case 2:
        // this.onRightMouseDown(event);
        break;
    }
    return;
  }

  protected onLeftMouseDown(event: MouseEvent) {
    const myEvent = event as MouseEvent;
    const rect = (this.gl.canvas as HTMLCanvasElement).getBoundingClientRect();

    this.downMouseX = myEvent.clientX - rect.left;
    this.downMouseY = myEvent.clientY - rect.top;

    document.addEventListener('mousemove', this.onMouseDownMove);
  }

  //Define in child class
  protected onMouseDownMove(event: MouseEvent) {

  }
}

export default Manipulator;