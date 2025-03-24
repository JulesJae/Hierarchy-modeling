const vs =  /*glsl*/`
  attribute vec4 a_position;

  uniform mat4 u_projection;
  uniform mat4 u_world2Camera;
  uniform mat4 u_object2world;

  void main() {
    gl_Position = u_projection * u_world2Camera * u_object2world * a_position;
  }
`;

const fs = /*glsl*/`

  precision mediump float;

  uniform vec4 u_objectId;
  
  vec3 packObjectId(float objectId) {
    float r = mod(objectId, 256.0) / 255.0;
    float g = mod(floor(objectId / 256.0), 256.0) / 255.0;
    float b = mod(floor(objectId / 256.0 * 256.0), 256.0) / 255.0;

    return vec3(r, g, b);
  }

  void main() {
    // vec3 color = packObjectId(u_objectId);

    // gl_FragColor = vec4(color, 1.0);
    gl_FragColor = u_objectId;
    // gl_FragColor = vec4(float(u_objectId), 0.0, 0.0, 1.0);
  }
`;

export default {
  vs, fs
}

