const vs = /*glsl*/`
  attribute vec4 a_position;
  attribute vec2 a_textcoord;

  uniform mat4 u_projection;
  uniform mat4 u_world2Camera;
  uniform mat4 u_object2world;

  varying vec2 v_textcoord;

  void main() {
    gl_Position = u_projection * u_world2Camera * u_object2world * a_position;
    v_textcoord = a_textcoord;
  }
`;

const fs = /*glsl*/`
  precision mediump float;

  uniform vec3 u_color;
  uniform bool u_isHighlighted;
  uniform bool u_isSelected;

  void main() {
    vec3 finalColor;
    vec3 selectedColor = vec3(float(0x46) / 255., float(0x82) / 255., float(0xb4) / 255.);
    // vec3 selectedColor = vec3(.3, .4, .12);

    if (u_isSelected) {
      finalColor = selectedColor;
    } else if (u_isHighlighted) {
      finalColor = mix(u_color, selectedColor, .6);
    } else {
      finalColor = u_color;
    }

    gl_FragColor = vec4(finalColor, 1.);
  }
`;

export default {
  vs,
  fs
};