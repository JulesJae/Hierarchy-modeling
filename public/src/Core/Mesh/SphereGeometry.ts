import { getSphereGeometry } from "../../lib/Geometry/Sphere";
import Geometry from "./Geometry";

class SphereGeometry extends Geometry {

  constructor(gl: WebGLRenderingContext) {
    super(gl, getSphereGeometry(.5, 12, 12), "SphereGeometry");
  }

}

export default SphereGeometry;