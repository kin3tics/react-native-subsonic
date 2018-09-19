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

    float random (in vec2 _st) {
        return fract(sin(dot(_st.xy,
                             vec2(12.9898,78.233)))*
            43758.5453123);
    }
    
    // Based on Morgan McGuire @morgan3d
    // https://www.shadertoy.com/view/4dS3Wd
    float noise (in vec2 _st) {
        vec2 i = ceil(_st);
        vec2 f = fract(_st);
    
        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
    
        vec2 u = f * f * (3.0 - 2.0 * f);
    
        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }
    
    #define NUM_OCTAVES 5
    
    float fbm ( in vec2 _st) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(120.0, 120.0);
        // Rotate to reduce axial bias
        mat2 rot = mat2(-cos(0.5), sin(0.5),
                        -sin(0.5), cos(0.50));
        for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(_st);
            _st = rot * _st * 2.0 + shift;
            a *= 0.5;
        }
        return v;
    }
    
    void main() {
        vec2 st = gl_FragCoord.xy/u_resolution.xy*1.;
        st += vec2(st.x + (sin(u_time*0.01) * 3.0), st.y + (cos(u_time*0.01) * 3.));
        vec3 color = vec3(0.0);
    
        vec2 q = vec2(0.);
        q.x = fbm( st + 0.00*u_time);
        q.y = fbm( st + vec2(1.0));
    
        vec2 r = vec2(0.);
        r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time );
        r.y = fbm( st + 1.0*q + vec2(8.3,0.8)+ -0.16*u_time);
    
        float f = fbm(st+r);
    
        color = mix(vec3(0.101961),
                    vec3(0.666667),
                    clamp((f*f)*3.0,0.0,1.0));
    
        color = mix(color,
                    vec3(0.8164706),
                    clamp(length(q),0.0,1.0));
    
        color = mix(color,
                    vec3(0.8666667),
                    clamp(length(r.x),0.0,1.0));
    
        gl_FragColor = vec4(mix(color1, color2, (f*f*f+.6*f*f+.5*f)*color),1.);
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
    console.log(this.props);
    return <Node shader={shaders.fluid} 
        uniforms={{
            color1: convertRgbColorToDecimal(color1),
            color2: convertRgbColorToDecimal(color2),
            u_time: time * .001,
            u_x: x,
            u_y: y}} />;
  }
}

export default Fluid;