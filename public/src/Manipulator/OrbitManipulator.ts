import Camera from "../lib/Camera";
import { multiply3DMatrix, oneToTwoDMatrix, rotatex, rotatey, rotatez } from "../Tools/3DMatrix";
import Matrix from "../Tools/Matrix";
import AnimationManager from "../Animation/AnimationManager";
import Manipulator from "./Manipulator";

class OrbitManipulator extends Manipulator {

  protected theta: number = 0;
  protected phi: number = 0;


  constructor(gl: WebGLRenderingContext,private camera: Camera, protected animationManager: AnimationManager) {
    super(gl, animationManager);
  }

  protected onMouseDownMove(event: MouseEvent): void {
    const { movementX, movementY } = event;
    this.theta += movementX;
    this.phi += movementY

    const yRotation = rotatey(this.theta);
    // const xRotation = rotatex(this.phi);
    // const matrix = new Matrix(oneToTwoDMatrix(multiply3DMatrix(yRotation, xRotation)));

    this.camera.rotate(new Matrix(oneToTwoDMatrix(yRotation)));
  }

}

export default OrbitManipulator;