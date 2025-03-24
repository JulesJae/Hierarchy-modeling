import Event from "../10_Hierarchy/Event";
import { camera, identite, multiply3DMatrix, orthogonalProjection, perspectiveProjection, rotatey, translate } from "../Tools/3DMatrix";
import Matrix, { arrayToMatrix } from "../Tools/Matrix";
import Vector, { cross_product } from "../Tools/Vector";

class Camera extends Event {

  private fov: number;
  private ar: number;
  private near: number;
  private far: number;
  private matrix: number[];
  private translation: number[];
  private rotation: number[];
  private position: Vector;
  private target: Vector;

  constructor(fov: number, ar: number, near: number, far: number) {
    super();
    this.fov = fov;
    this.ar = ar;
    this.near = near;
    this.far = far;
    this.position = new Vector([0, 0, 0]);
    this.target = new Vector([0, 0, 0]);
    this.lookAt(new Vector([0, 0, -10]), this.target);
    // this.translation = camera();
    // this.rotation = rotatey(-15);

    // this.translation = multiply3DMatrix(translate(0, 0, -7), this.translation);
    // this.matrix = multiply3DMatrix(this.matrix, rotatey(Math.PI, true));
  }

  getMatrix() {
    // return multiply3DMatrix(this.translation, this.rotation);
    return this.matrix;
  }

  getRotationMatrix() {
    const [
      x0, x1, x2, x3,
      y0, y1, y2, y3,
      z0, z1, z2, z3,
      t0, t1, t2, t3,
    ] = this.matrix;

    return new Matrix([
      [x0, x1, x2],
      [y0, y1, y2],
      [z0, z1, z2],
    ]);
  }

  lookAt(from: Vector, to: Vector) {
    const zVector = (from.clone().sub(to) as Vector);
    
    zVector.normalize();

    const j = new Vector([0, 1, 0]);
    const xVector = cross_product(zVector, j) as Vector;
    const yVector = cross_product(zVector, xVector) as Vector;
    this.matrix = [
      xVector.x, xVector.y, xVector.z, 0, 
      yVector.x, yVector.y, yVector.z, 0, 
      zVector.x, zVector.y, zVector.z, 0, 
      from.x, from.y, from.z, 1
    ];
    this.position = from;
    this.dispatch("cameraPosition", this.position);
  }

  rotate(matrix: Matrix) {
    // this.matrix = multiply3DMatrix(matrix.toArray(), this.matrix);
    // const fields = this.position.toArray();
    const homogeneousPosition = new Vector([0, 0, -10, 1]);
    const [x,y, z, w] = (matrix.transformColMajorOrder(homogeneousPosition) as Vector).toArray();

    this.lookAt(new Vector([x, y, z]), this.target);
  }

  getPerspectiveMatrix() {
    return perspectiveProjection(this.fov, this.ar, this.near, this.far);
  }

  getOrthogonalMatrix() {
    // return orthogonalProjection()
  }

  getWorldToCamera(): number[] {
    const rotationMatrix = this.getRotationMatrix();
    const inverseMatrix = rotationMatrix.transpose();
    const inverseTranslation = inverseMatrix.transformColMajorOrder(this.position) as Vector;
    const [
      x0, x1, x2,
      y0, y1, y2,
      z0, z1, z2,
    ] = inverseMatrix.toArray();

    // return arrayToMatrix(this.getMatrix())?.inverse()?.toArray() as number[];
    return [
      x0, x1, x2, 0,
      y0, y1, y2, 0,
      z0, z1, z2, 0,
      -inverseTranslation.x, -inverseTranslation.y, -inverseTranslation.z, 1
    ];
  }


}

export default Camera;