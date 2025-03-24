
type PixelInfo = {
  objectId: number;
  drawId: number;
  primId: number;
}

class PickingTexture {

  private fbo: WebGLFramebuffer;
  private gl: WebGLRenderingContext;
  private pickingTexture: WebGLTexture;
  private width: number;
  private height: number;


  constructor(gl: WebGLRenderingContext, width: number, height: number) {
    this.gl = gl;
    this.fbo = gl.createFramebuffer();
    this.width = width;
    this.height = height;

    this.initTexture();

    //Attache la texture al'emplacement du buffer de couleur COLOR_ATTACHMENT0

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      this.pickingTexture,
      0
    );
    const status = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);
    if (status !== this.gl.FRAMEBUFFER_COMPLETE) {
      console.error("Framebuffer not complete: ", status);
    }

    gl.viewport(0, 0, width, height);
  }

  private initTexture() {
    this.pickingTexture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.pickingTexture);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.width, this.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
  }

  enableWriting() {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo)
  }

  disableWriting() {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

  }

  readPixel(x: number, y: number): number {
    const pixels = new Uint8Array(4)

    // this.gl.readBuffer(this.gl.COLOR_ATTACHMENT0);
    //enfonction du type de texture qu'on souhaite lire les valeurs de formats et types peuvent
    //varier d'un device a un autre. Ne pas hardcoder: this.gl.RGBA, this.gl.UNSIGNED_BYTE
    const format = this.gl.getParameter(this.gl.IMPLEMENTATION_COLOR_READ_FORMAT);
    const type = this.gl.getParameter(this.gl.IMPLEMENTATION_COLOR_READ_TYPE);

    this.gl.readPixels(x, y, 1, 1, format, type, pixels);
    
    // this.gl.readBuffer(this.gl.NONE);

    // console.log(pixels, `x: ${x}, y: ${y}`);
    const ret = pixels[0] + (pixels[1] << 8) + (pixels[2] << 16) + (pixels[3] << 24);

    return ret;

  }

}

export default PickingTexture;