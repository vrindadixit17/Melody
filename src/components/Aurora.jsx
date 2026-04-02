import { Renderer, Program, Mesh, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

function hexToVec3(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255
  ];
}

const vertex = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform float uScale;
uniform float uBrightness;
uniform vec3 uColor1;
uniform vec3 uColor2;

#define TAU 6.28318

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
}

float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0,0.0));
  float c = hash(i + vec2(0.0,1.0));
  float d = hash(i + vec2(1.0,1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}

float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for(int i=0;i<5;i++){
    v += a*noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uResolution.xy;

  uv -= 0.5;
  uv.x *= uResolution.x/uResolution.y;

  float t = uTime * uSpeed;

  float n = fbm(uv * uScale + vec2(0.0, t));
  float band = smoothstep(0.3, 0.8, n);

  vec3 color = mix(uColor1, uColor2, band);
  color *= uBrightness * 0.7;

  float fade = smoothstep(0.8, 0.2, abs(uv.y));
  color *= fade;

  color += 0.2 * pow(band, 3.0);

  float alpha = clamp(length(color), 0.0, 1.0);

  gl_FragColor = vec4(color, alpha);
}
`;

export default function Aurora({
  color1 = '#ffffff',
  color2 = '#a5b4fc',
  speed = 0.4,
  scale = 2,
  brightness = 2
}) {
  const ref = useRef();

  useEffect(() => {
    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [gl.canvas.width, gl.canvas.height] },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uBrightness: { value: brightness },
        uColor1: { value: hexToVec3(color1) },
        uColor2: { value: hexToVec3(color2) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
    }

    window.addEventListener('resize', resize);
    resize();

    ref.current.appendChild(gl.canvas);

    let raf;
    function update(t) {
      raf = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    }
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [color1, color2]); // 🔥 reacts to color change

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
}