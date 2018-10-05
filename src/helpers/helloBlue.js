import React from "react";
import { Shaders, Node, GLSL } from "gl-react";



const shaders = Shaders.create({
  helloBlue: {
    frag: GLSL`
    precision highp float;
  varying vec2 uv;
  void main() {
    gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
  }
  `
  }
});

class HelloBlue extends React.Component {
  render() {
    const { color1, color2, color3, color4 } = this.props;
    return <Node shader={shaders.helloBlue} uniforms={{ circle1From: color1, circle1To: color2 }} />;
  }
}

export default HelloBlue;