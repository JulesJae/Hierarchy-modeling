import { rotatex, rotatey } from "./Tools/3DMatrix";
import Head from "./Model/Head";
import LowerArm from "./Model/LowerArm";
import LeftUpperArm from "./Model/LeftUpperArm";
import RightUpperArm from "./Model/RightUpperArm";
import Part from "./Model/Part";
import Torse from "./Model/Torse";
import LeftUpperLeg from "./Model/LeftUpperLeg";
import RightUpperLeg from "./Model/RightUpperLeg";
import LowerLeg from "./Model/LowerLeg";
import MeshFactory from "./Core/Mesh/MeshFactory";
import CubeGeometry from "./Core/Mesh/CubeGeometry";


class HumanRobot {
  protected head: Part;
  protected torse: Part;
  protected leftUpperArm: Part;
  protected leftLowerArm: Part;
  protected rightUpperArm: Part;
  protected rightLowerArm: Part;
  protected leftUpperleg: Part;
  protected leftLowerleg: Part;
  protected rightUpperleg: Part;
  protected rightLowerleg: Part;

  constructor(gl: WebGLRenderingContext) {
    const initialGeometry = new CubeGeometry(gl);

    this.torse = new Torse();
    this.torse.setMesh(MeshFactory.createMesh(gl, initialGeometry));

    this.head = new Head(this.torse);
    this.head.setMesh(MeshFactory.createMesh(gl, initialGeometry));

    this.leftUpperArm = new LeftUpperArm(this.torse);
    this.leftUpperArm.setMesh(MeshFactory.createMesh(gl, initialGeometry));

    this.leftLowerArm = new LowerArm("leftLowerArm", this.leftUpperArm);
    this.leftLowerArm.setMesh(MeshFactory.createMesh(gl, initialGeometry));

    this.rightUpperArm = new RightUpperArm(this.torse);
    this.rightUpperArm.setMesh(MeshFactory.createMesh(gl, initialGeometry));

    this.rightLowerArm = new LowerArm("rightLowerArm", this.rightUpperArm);
    this.rightLowerArm.setMesh(MeshFactory.createMesh(gl, initialGeometry));

    this.leftUpperleg = new LeftUpperLeg(this.torse);
    this.leftUpperleg.setMesh(MeshFactory.createMesh(gl, initialGeometry));

    this.leftLowerleg = new LowerLeg("leftLowerLeg", this.leftUpperleg);
    this.leftLowerleg.setMesh(MeshFactory.createMesh(gl, initialGeometry));

    this.rightUpperleg = new RightUpperLeg(this.torse);
    this.rightUpperleg.setMesh(MeshFactory.createMesh(gl, initialGeometry));

    this.rightLowerleg = new LowerLeg("rightLowerLeg", this.rightUpperleg);
    this.rightLowerleg.setMesh(MeshFactory.createMesh(gl, initialGeometry));

  }

  rotateXTorso(xAngle) {
    this.torse.updateRotation(rotatex(xAngle));
  }

  rotateYTorso(yAngle) {
    this.torse.updateRotation(rotatey(yAngle));
  }

  findMesh(id: number) {
    const findItem = (part: Part, id: number) => {
      if (id === part.getId()) {
        return part;
      }
      
      if (part.childs.length > 0) {
        for (let child of part.childs) {
          const found = findItem(child, id);

          if (found) 
            return found;

        }
      }

      return null;
    }

    return findItem(this.torse, id);
  }

  traverse(fn: (p: Part) => void) {
    const traverse = (p: Part) => {
      fn(p);
      p.childs.forEach(traverse)
    }

    traverse(this.torse);
  }

}

export default HumanRobot