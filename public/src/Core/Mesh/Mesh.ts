import Geometry from "./Geometry";
import { Material } from "./Material";

class Mesh {
  private gl: WebGLRenderingContext;
  private geometry: Geometry;
  private id: number;
  private material: Material;

  constructor(gl: WebGLRenderingContext ,geometry: Geometry, id: number) {
    this.gl = gl
    this.geometry = geometry;
    this.id = id;
  }

  setMaterial(material: Material) {
    this.material = material;
    console.log(this.material);
  }

  setGeometry(geometry: Geometry) {
    this.geometry = geometry;
  }


  getId() {
    return this.id;
  }


  getv4Id() {
    const ret =  [
      ((this.id >>  0) & 0xFF) / 0xFF,
      ((this.id >>  8) & 0xFF) / 0xFF,
      ((this.id >> 16) & 0xFF) / 0xFF,
      ((this.id >> 24) & 0xFF) / 0xFF,
    ];

    // console.log(`getv4Id: `, ret);
    return ret;
  }

  draw(program: WebGLProgram , isPicking: boolean) {
    if (isPicking) {
      const objectIdLocation = this.gl.getUniformLocation(program, "u_objectId");

      // console.log(`u_objectId: ${this.id}`);
      this.gl.uniform4fv(objectIdLocation, this.getv4Id());
    } else {
      // console.log("draw meshid: " + this.id);
      const colorLocation = this.gl.getUniformLocation(program, "u_color");

      this.gl.uniform3fv(colorLocation, this.material.color);
    }
    
    this.geometry.draw(program);
  }
}

export default Mesh;