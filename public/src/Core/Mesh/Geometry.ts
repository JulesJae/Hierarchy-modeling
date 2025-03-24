
class Geometry {
  private vertexCount: number;
  private buffer: WebGLBuffer;

  protected name: string;
  
  constructor(private gl: WebGLRenderingContext, vertices: number[], name: string) {
    this.buffer = this.gl.createBuffer();
    this.name = name;

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

    this.vertexCount = vertices.length / 3;
  }

  draw(program: WebGLProgram) {
    const location = this.gl.getAttribLocation(program, 'a_position');

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.vertexAttribPointer(location, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(location);

    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexCount);
  }

  getName() {
    return this.name;
  }
}

export default Geometry;