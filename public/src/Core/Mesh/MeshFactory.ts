import Geometry from "./Geometry";
import Mesh from "./Mesh";

export default class MeshFactory {
  private static id: number = 0;

  public static createMesh(gl: WebGLRenderingContext, geometry: Geometry) {
    MeshFactory.id++;
    
    return new Mesh(gl, geometry, MeshFactory.id);
  }

}