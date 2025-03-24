import { getCube } from "../../Tools/Geometry";
import Geometry from "./Geometry";

class CubeGeometry extends Geometry {

  constructor(gl: WebGLRenderingContext) {
    super(gl, getCube(), "CubeGeometry");
  }

}

export default CubeGeometry;