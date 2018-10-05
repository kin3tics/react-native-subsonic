import React from "react";
import { Shaders, Node, GLSL } from "gl-react";



const shaders = Shaders.create({
  fluid: {
    frag: GLSL`
    #ifdef GL_ES
precision mediump float;
#endif
uniform vec3 color1;
uniform vec3 color2;
uniform float u_x;
uniform float u_y; 
uniform float u_time;

vec2 u_resolution = vec2(u_x, u_y);
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*50.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.034390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 110.0 * dot(m, g);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);
    vec2 pos = vec2(st.x*-2.1, st.y*2.1);

    float DF = 0.0;

    // Add a random position
    float a = 0.0;
    vec2 vel = vec2(u_time*.0001);
    DF += snoise(pos+vel)*.3+.2;

    // Add a random position
    a = snoise(pos*vec2(cos(u_time*0.00015),sin(u_time*0.0001))*0.1)*3.1415;
    vel = vec2(cos(a),sin(a));
    DF += snoise(pos+vel)*.3+.29;

    color = vec3( smoothstep(.3,.75,fract(DF)) );

    gl_FragColor = vec4(mix(color1, color2, 1.-color),1.0);
}
  `
  }
});

function convertRgbColorToDecimal(arr) {
    return [arr[0]/255, arr[1]/255, arr[2]/255];
}

class Fluid extends React.Component {
  render() {
    const { color1, color2, time, x, y } = this.props;
    return <Node shader={shaders.fluid} 
        uniforms={{
            color1: convertRgbColorToDecimal(color1),
            color2: convertRgbColorToDecimal(color2),
            u_time: time,
            u_x: x,
            u_y: y}} />;
  }
}

export default Fluid;