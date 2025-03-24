import Camera from "../lib/Camera";
import { initWebGL } from "../lib/WebGL/Utility";
import AnimationManager from "./Animation/AnimationManager";
import JumpAnimation from "./Animation/JumpAnimation";
import RestAnimation from "./Animation/RestAnimation";
import RunAnimation from "./Animation/RunAnimation";
import CubeDrawingProgram from "./CubeDrawingProgram";
import Event from "./Event";
import HumanRobot from "./HumanRobot";
import Manipulator from "./Manipulator/Manipulator";
import OrbitManipulator from "./Manipulator/OrbitManipulator";
import Shader10 from "../Shaders/10"
import PickingShader from "../Shaders/picking";
import { initShaderProgram } from "../Tools/Shader";
import PickingTexture from "./Core/PickingTexture";
import Mesh from "./Core/Mesh/Mesh";
import Part from "./Model/Part";

function initAnimationManager(humanRobot: HumanRobot): AnimationManager {
  const restAnimation = new RestAnimation(humanRobot);
  const animationManager = new AnimationManager(restAnimation);
  
  animationManager.add(new RunAnimation(humanRobot));
  animationManager.add(new JumpAnimation(humanRobot));
  return animationManager;
}

class WebGLViewer extends Event {
  public camera: Camera;
  
  protected gl: WebGLRenderingContext;
  protected ar: number;
  // protected drawingProgram: CubeDrawingProgram;
  protected hr: HumanRobot;
  protected animationManager: AnimationManager;
  private fps: number;
  protected manipulator: Manipulator;
  protected drawingProgram: WebGLProgram;
  protected pickingProgram: WebGLProgram;
  protected pickingTexture: PickingTexture;

  protected selectedPart: Part | null;


  constructor(canvasName: string) {
    super();
    this.gl = initWebGL(canvasName);
    this.pickingTexture = new PickingTexture(this.gl, this.gl.canvas.width, this.gl.canvas.height);
    this.select = this.select.bind(this);

    this.ar = this.gl.canvas.width / this.gl.canvas.height;
    this.camera = new Camera(65, this.ar, 0.001, 1000);
    this.render = this.render.bind(this);
    this.fps = 0;
    this.drawingProgram = new CubeDrawingProgram(this.gl, this.camera);
    this.hr = new HumanRobot(this.gl);
    this.animationManager = initAnimationManager(this.hr);
    this.manipulator = new OrbitManipulator(this.gl, this.camera, this.animationManager);
    this.selectedPart = null;

    this.manipulator.setHandleClick(this.select);
    
    this.initPrograms();
    requestAnimationFrame(this.render);
  }

  getContext() {
    return this.gl;
  }

  private initPrograms() {
    this.drawingProgram = initShaderProgram(this.gl, Shader10.vs, Shader10.fs) as WebGLProgram;
    this.pickingProgram = initShaderProgram(this.gl, PickingShader.vs, PickingShader.fs) as WebGLProgram;
  }

  private select(x: number, y: number) {
    this.pickingTexture.enableWriting();
    const id = this.getId(x, y);
    
    if (this.selectedPart) {
      this.selectedPart.unselect();
      this.selectedPart = null;
    }

    this.selectedPart = this.hr.findMesh(id);

    if (this.selectedPart) this.selectedPart.select();

    this.pickingTexture.disableWriting();
    this.dispatch("selection", this.selectedPart ? this.selectedPart.getMesh() : null);
  }

  render(time: number) {
    this.fps++;

    if (time % 1000 > 990) {
      this.dispatch("fps", this.fps);
      this.fps = 0;
    }
    this.animationManager.play(time);

    this.pickingTexture.enableWriting();
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.pickingLoop();
    this.pickingPhase();
    this.pickingTexture.disableWriting();

    this.gl.clearColor(0.9, 0.9, 0.9, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
    this.renderLoop();

    requestAnimationFrame(this.render);
  }

  /**
   * 
   */
  protected pickingPhase() {
    const id = this.getId(this.manipulator.mouseX, this.manipulator.mouseY);

    this.dispatch("pickingId", id);
    // const id = this.pickingTexture.readPixel(this.manipulator.mouseX, this.manipulator.mouseY);
    this.hr.traverse((p) => {
      if (p.getId() === id) p.highlight();

      else if (p.highlighted) p.unhighlight();
    });

  }

  protected getId(x: number, y: number) {
    const pixelX = x / (this.gl.canvas as HTMLCanvasElement).clientWidth * this.gl.canvas.width;
    const pixelY = this.gl.canvas.height - y / (this.gl.canvas as HTMLCanvasElement).clientHeight * this.gl.canvas.height - 1;
    const id = this.pickingTexture.readPixel(pixelX, pixelY);

    return id;
  }

  protected renderLoop() {
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.useProgram(this.drawingProgram);


    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.drawingProgram, "u_projection"), false, this.camera.getPerspectiveMatrix());
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.drawingProgram, "u_world2Camera"), false, this.camera.getWorldToCamera());

    this.hr.traverse((part) => {
      this.gl.uniform1i(this.gl.getUniformLocation(this.drawingProgram, "u_isHighlighted"), part.highlighted ? 1 : 0);
      this.gl.uniform1i(this.gl.getUniformLocation(this.drawingProgram, "u_isSelected"), part.selected ? 1 : 0);

      this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.drawingProgram, "u_object2world"), false, part.getMatrix());
      
      part.getMesh().draw(this.drawingProgram, false);
    });
    
  }

  protected pickingLoop() {
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.useProgram(this.pickingProgram);

    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.pickingProgram, "u_projection"), false, this.camera.getPerspectiveMatrix());
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.pickingProgram, "u_world2Camera"), false, this.camera.getWorldToCamera());

    this.hr.traverse((part) => {
      this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.pickingProgram, "u_object2world"), false, part.getMatrix());
      part.getMesh().draw(this.pickingProgram, true);
    });

  }
}

// new WebGLViewer("canvas");

export default WebGLViewer;