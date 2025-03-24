import { identite, multiply3DMatrix, rotatex, rotatey, rotatez, translate } from "../Tools/3DMatrix";
import { Material } from "../Core/Mesh/Material";
import Mesh from "../Core/Mesh/Mesh";

class Part {

  protected parentToLocal: number[];
  protected localTranslate: number[];
  protected localRotate: number[];
  protected localScale: number[];
  protected parent?: Part;
  protected color: number[];
  protected name: string;
  protected mesh: Mesh;
  
  public childs: Part[];
  public highlighted: boolean = false;
  public selected: boolean = false;

  constructor(name: string, parent?: Part) {
    this.name = name;
    this.childs = [];
    this.parentToLocal = identite();
    this.localTranslate = identite();
    this.localRotate = identite();
    this.parent = parent;

    if (parent)
      parent.childs.push(this);
  }

  getId() {
    return this.mesh.getId();
  }

  setMesh(mesh: Mesh) {
    mesh.setMaterial(new Material(this.color[0], this.color[1], this.color[2]));
    this.mesh = mesh;
    console.log("set mesh mesh = ", mesh);
  }

  getMesh() { return this.mesh; }

  getColor() { return this.color; }

  setRotation(rotate: number[]) {
    this.localRotate = rotate;
  }

  updateRotation(rotate: number[]) {
    this.localRotate = multiply3DMatrix(this.localRotate, rotate);
  }

  getMatrix() {
    const localMatrix = multiply3DMatrix(this.parentToLocal, this.getScaleInstanceMatrix())

    if (!this.parent) return localMatrix;

    const modelMatrix = this.parent.getModelMatrix();

    return multiply3DMatrix(modelMatrix, localMatrix);
  }

  getModelMatrix() {
    const localMatrix = multiply3DMatrix(this.parentToLocal, this.getInstanceMatrix());

    if (!this.parent) return localMatrix;

    const modelMatrix = this.parent.getModelMatrix();

    return multiply3DMatrix(modelMatrix, localMatrix);
  }

  getName() {
    return this.name;
  }

  rotatex(number) {
    this.localRotate = rotatex(number);
  }
  rotatey(number) {
    this.localRotate = rotatez(number);
  }

  translateY(number) {
    this.localTranslate = multiply3DMatrix(translate(0, number, 0), this.localTranslate);
    console.log(`translateY number ${number}`)
    console.log(this.localTranslate);
  }

  highlight() {
    this.highlighted = true;
  }

  unhighlight() {
    this.highlighted = false;
  }

  select() {
    console.log("part.select: ", this);
    this.selected = true;
  }

  unselect() { this.selected = false; }

  getX() {
    return this.localTranslate[12];
  }
  getY() {
    return this.localTranslate[13];
  }
  getZ() {
    return this.localTranslate[14];
  }
  setX(x) {
    this.localTranslate[12] = x;
  }
  setY(y) {
    this.localTranslate[13] = y;
  }
  setZ(z) {
    this.localTranslate[14] = z;
  }

  protected getInstanceMatrix() {
    return multiply3DMatrix(this.localRotate, this.localTranslate);
  }

  protected getScaleInstanceMatrix() {
    let ret = this.localScale;

    ret = multiply3DMatrix(this.localTranslate, ret);
    return multiply3DMatrix(this.localRotate, ret);
  }

}

export default Part;