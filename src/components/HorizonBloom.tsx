import {
  type CSSProperties,
  forwardRef,
  type ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useSyncExternalStore,
} from "react";
import { cn } from "@/lib/utils";

export interface HorizonBloomRef {
  bloom: (x?: number, strength?: number) => void;
  replay: () => void;
}

export interface HorizonBloomProps {
  colors?: [string, string];
  backgroundColor?: string;
  horizon?: number;
  curvature?: number;
  tilt?: number;
  sunPosition?: number;
  sunrise?: number;
  spread?: number;
  atmosphere?: number;
  thickness?: number;
  rim?: number;
  flare?: number;
  airglow?: number;
  clouds?: number;
  stars?: number;
  aurora?: number;
  autoAurora?: boolean;
  speed?: number;
  drift?: number;
  parallax?: number;
  bloom?: number;
  grain?: number;
  interactive?: boolean;
  intro?: boolean;
  paused?: boolean;
  dpr?: number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));
const finiteOr = (v: number | undefined, fallback: number) =>
  typeof v === "number" && Number.isFinite(v) ? v : fallback;

const parseColor = (input: string): [number, number, number] | null => {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed || trimmed === "transparent" || trimmed === "none" || trimmed === "auto") {
    return null;
  }
  if (trimmed.startsWith("#")) {
    const hex = trimmed.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      const r = Number.parseInt(hex[0] + hex[0], 16);
      const g = Number.parseInt(hex[1] + hex[1], 16);
      const b = Number.parseInt(hex[2] + hex[2], 16);
      if (Number.isFinite(r) && Number.isFinite(g) && Number.isFinite(b)) {
        return [r / 255, g / 255, b / 255];
      }
    } else if (hex.length === 6 || hex.length === 8) {
      const r = Number.parseInt(hex.slice(0, 2), 16);
      const g = Number.parseInt(hex.slice(2, 4), 16);
      const b = Number.parseInt(hex.slice(4, 6), 16);
      if (Number.isFinite(r) && Number.isFinite(g) && Number.isFinite(b)) {
        return [r / 255, g / 255, b / 255];
      }
    }
    return null;
  }
  const rgbMatch = trimmed.match(/rgba?\(([^)]+)\)/);
  if (rgbMatch) {
    const parts = rgbMatch[1]
      .split(/[\s,/]+/)
      .filter(Boolean)
      .map((p) => Number.parseFloat(p));
    if (parts.length >= 3 && parts.slice(0, 3).every(Number.isFinite)) {
      return [
        clamp(parts[0] / 255, 0, 1),
        clamp(parts[1] / 255, 0, 1),
        clamp(parts[2] / 255, 0, 1),
      ];
    }
  }
  return null;
};

const srgbToLinear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

const linearToSrgb = (c: number) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

const rgbToOklab = ([r, g, b]: [number, number, number]): [number, number, number] => {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
};

const oklabToRgb = ([L, a, b]: [number, number, number]): [number, number, number] => {
  const l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
  const m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
  const s = Math.pow(L - 0.0894841775 * a - 1.291485548 * b, 3);
  return [
    clamp(linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s), 0, 1),
    clamp(linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s), 0, 1),
    clamp(linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s), 0, 1),
  ];
};

const mixVec3 = (
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

const subscribeReducedMotion = (cb: () => void) => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

const getReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const VERTEX_SHADER = `
precision highp float;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const SCENE_FRAGMENT_SHADER = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uRoll;
uniform float uApex;
uniform float uRadius;
uniform float uSunArc;
uniform float uSpread;
uniform float uSunUp;
uniform float uAtmo;
uniform float uThick;
uniform float uRimGain;
uniform float uFlare;
uniform float uAirglow;
uniform float uClouds;
uniform float uStars;
uniform float uAuroraGain;
uniform vec4 uAuroras[8];
uniform float uInk;
uniform vec3 uRimColor;
uniform vec3 uInner;
uniform vec3 uMid;
uniform vec3 uOuter;
uniform vec3 uGlowColor;
uniform vec3 uSunColor;
uniform vec3 uStarColor;
varying vec2 vUv;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

vec3 starField(vec2 p) {
  vec3 c = vec3(0.0);
  for (int k = 0; k < 2; k++) {
    float scale = k == 0 ? 70.0 : 130.0;
    vec2 g = p * scale + float(k) * 17.3;
    vec2 id = floor(g);
    vec2 f = fract(g) - 0.5;
    float h = hash(id);
    vec2 offset = vec2(hash(id + 3.1), hash(id + 7.7)) - 0.5;
    float twinkle = 0.6 + 0.4 * sin(uTime * (1.0 + 3.0 * hash(id + 1.3)) + h * 50.0);
    float b = pow(h, 30.0) * twinkle;
    float d = length(f - offset * 0.7);
    c += uStarColor * b * exp(-d * d * 300.0) * (k == 0 ? 0.9 : 0.45);
  }
  return c;
}

void main() {
  vec2 frag = vUv * uRes;
  vec2 screen = (frag - 0.5 * uRes) / uRes.y;
  float cr = cos(uRoll);
  float sr = sin(uRoll);
  vec2 p = mat2(cr, -sr, sr, cr) * screen;
  float px = 1.0 / uRes.y;
  vec2 center = vec2(0.0, uApex - uRadius);
  vec2 q = p - center;
  float h = length(q) - uRadius;
  float arc = atan(q.x, q.y) * uRadius;
  float d = arc - uSunArc;
  float lit = exp(-d * d / (2.0 * uSpread * uSpread));
  float wide = exp(-d * d / (10.0 * uSpread * uSpread));
  float hot = exp(-d * d / (2.0 * 0.034 * 0.034));
  float halo = exp(-d * d / (2.0 * 0.17 * 0.17));
  float thick = uThick;
  float sunk = 1.0 - 0.8 * uInk;
  vec3 col = vec3(0.0);
  if (h > 0.0) {
    float rim = exp(-h / max(0.0012, px * 0.9));
    float inner = exp(-h / (0.007 * thick));
    float mid = exp(-h / (0.024 * thick));
    float outer = exp(-h / (0.07 * thick));
    col += lit * (rim * uRimColor * 2.2 * uRimGain + inner * uInner * 0.7 * uAtmo);
    col += wide * (mid * uMid * 0.2 + outer * uOuter * 0.055) * uAtmo;
    float layer = h - 0.042 * thick;
    float band = exp(-layer * layer / (0.00005 * thick * thick));
    if (uAirglow > 0.0 && band > 0.0001) {
      band *= 0.35 + 0.65 * fbm(vec2(arc * 9.0 - uTime * 0.04, uTime * 0.02));
      col += band * uGlowColor * 0.05 * (0.2 + 0.8 * wide) * uAirglow;
    }
    col += sunk * hot * uSunUp * (exp(-h / 0.003) * uSunColor * 4.0 + exp(-h / (0.016 * thick)) * uInner * 0.7);
    col += halo * uSunUp * (exp(-h / (0.045 * thick)) * uInner * 0.2 + exp(-h / (0.12 * thick)) * uMid * 0.06) * uAtmo;
    if (uStars > 0.0 && uInk < 0.5) col += starField(p) * smoothstep(0.04, 0.2, h) * (1.0 - 0.8 * wide) * uStars;
  } else {
    col += lit * exp(h / max(0.0008, px * 0.6)) * uRimColor * 1.1 * uRimGain;
    col += sunk * hot * uSunUp * exp(h / 0.005) * uMid * 0.3;
    if (uClouds > 0.0 && h > -0.12) {
      float tops = fbm(vec2(arc * 22.0 + uTime * 0.01, h * 160.0 + arc * 6.0));
      float catchLight = smoothstep(0.52, 0.78, tops) * exp(h / 0.018) * smoothstep(-0.12, -0.07, h) * lit;
      col += catchLight * mix(uMid, uInner, halo) * 0.14 * uClouds * uSunUp;
    }
  }
  vec2 sun = center + uRadius * vec2(sin(uSunArc / uRadius), cos(uSunArc / uRadius));
  float rs = length(p - sun);
  float crest = smoothstep(-0.0015, 0.0015, h);
  col += uSunUp * uSunUp * uFlare * sunk * (exp(-rs / 0.005) * uSunColor * 2.0 * crest + exp(-rs / 0.05) * uInner * 0.07);
  if (h > 0.0 && h < 0.42) {
    for (int i = 0; i < 8; i++) {
      vec4 aurora = uAuroras[i];
      if (aurora.z <= 0.0) continue;
      float age = aurora.y;
      float width = 0.09 + 0.12 * smoothstep(0.0, 2.5, age);
      float dc = arc - aurora.x;
      if (abs(dc) > width * 3.0) continue;
      float span = max(exp(-dc * dc / (2.0 * width * width)) - 0.0111, 0.0) / 0.9889;
      float envelope = smoothstep(0.0, 1.4, age) * (1.0 - smoothstep(2.6, 6.6, age)) * aurora.z;
      float drift = uTime * 0.03 + aurora.w;
      float fine = noise(vec2(arc * 140.0 + drift * 5.0, aurora.w + age * 0.15));
      float fold = noise(vec2(arc * 30.0 - drift * 2.0, aurora.w + 4.0));
      float rays = (0.2 + 0.8 * fine * fine) * (0.45 + 0.55 * fold);
      float reach = (0.04 + 0.08 * noise(vec2(arc * 46.0 + aurora.w * 3.0, drift * 0.5))) * (0.5 + 0.5 * smoothstep(0.0, 2.2, age));
      float base = 0.007 + 0.004 * fold;
      float lower = smoothstep(base * 0.4, base + 0.006, h);
      float y = max(h - base, 0.0);
      float body = exp(-y / reach) * (1.0 - smoothstep(0.12, 0.38, h));
      float glow = exp(-y / 0.02) * 0.2;
      vec3 tint = mix(uInner, uMid, smoothstep(0.0, 0.05, y));
      tint = mix(tint, uOuter, smoothstep(0.05, 0.16, y));
      col += span * lower * (body * rays + glow * (0.5 + 0.5 * fold)) * envelope * tint * 0.9 * uAuroraGain;
    }
  }
  if (uInk > 0.5) {
    float peak = max(col.r, max(col.g, col.b));
    float alpha = 1.0 - exp(-peak * 1.5);
    gl_FragColor = vec4(col / max(peak, 0.0001) * alpha, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;

const DOWN_FRAGMENT_SHADER = `
precision highp float;
uniform sampler2D uSource;
uniform vec2 uTexel;
uniform float uThreshold;
varying vec2 vUv;
vec3 tap(vec2 d) {
  vec3 c = texture2D(uSource, vUv + d * uTexel).rgb;
  float peak = max(c.r, max(c.g, c.b));
  return c * (max(peak - uThreshold, 0.0) / max(peak, 0.0001));
}
void main() {
  vec3 a = tap(vec2(-2.0, 2.0));
  vec3 b = tap(vec2(0.0, 2.0));
  vec3 c = tap(vec2(2.0, 2.0));
  vec3 d = tap(vec2(-2.0, 0.0));
  vec3 e = tap(vec2(0.0, 0.0));
  vec3 f = tap(vec2(2.0, 0.0));
  vec3 g = tap(vec2(-2.0, -2.0));
  vec3 h = tap(vec2(0.0, -2.0));
  vec3 i = tap(vec2(2.0, -2.0));
  vec3 j = tap(vec2(-1.0, 1.0));
  vec3 k = tap(vec2(1.0, 1.0));
  vec3 l = tap(vec2(-1.0, -1.0));
  vec3 m = tap(vec2(1.0, -1.0));
  vec3 color = e * 0.125 + (a + c + g + i) * 0.03125 + (b + d + f + h) * 0.0625 + (j + k + l + m) * 0.125;
  gl_FragColor = vec4(color, 1.0);
}
`;

const UP_FRAGMENT_SHADER = `
precision highp float;
uniform sampler2D uSource;
uniform vec2 uTexel;
varying vec2 vUv;
vec3 tap(vec2 d) { return texture2D(uSource, vUv + d * uTexel).rgb; }
void main() {
  vec3 color = tap(vec2(0.0)) * 4.0
    + (tap(vec2(-1.0, 0.0)) + tap(vec2(1.0, 0.0)) + tap(vec2(0.0, -1.0)) + tap(vec2(0.0, 1.0))) * 2.0
    + tap(vec2(-1.0, -1.0)) + tap(vec2(1.0, -1.0)) + tap(vec2(-1.0, 1.0)) + tap(vec2(1.0, 1.0));
  gl_FragColor = vec4(color / 16.0, 1.0);
}
`;

const COMPOSITE_FRAGMENT_SHADER = `
precision highp float;
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform vec3 uBackground;
uniform vec2 uResolution;
uniform float uBloomStrength;
uniform float uGrain;
uniform float uTime;
uniform float uInk;
varying vec2 vUv;

vec3 neutral(vec3 color) {
  const float start = 0.76;
  const float desaturation = 0.15;
  float x = min(color.r, min(color.g, color.b));
  float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
  color -= offset;
  float peak = max(color.r, max(color.g, color.b));
  if (peak < start) return color;
  const float d = 1.0 - start;
  float next = 1.0 - d * d / (peak + d - start);
  color *= next / peak;
  float g = 1.0 - 1.0 / (desaturation * (peak - next) + 1.0);
  return mix(color, vec3(next), g);
}

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  float n = hash(gl_FragCoord.xy + fract(uTime * 13.0) * 911.0) - 0.5;
  if (uInk > 0.5) {
    vec4 scene = texture2D(uScene, vUv);
    float cover = clamp(scene.a, 0.0, 1.0);
    vec3 ink = scene.rgb / max(scene.a, 0.0001);
    vec3 color = mix(uBackground, ink, cover);
    color += n * uGrain * 0.05 * smoothstep(0.0, 0.05, cover);
    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
    return;
  }
  vec2 c = vUv - 0.5;
  vec2 shift = c * 1.2 / uResolution.y;
  vec3 emission;
  emission.r = texture2D(uScene, vUv + shift).r;
  emission.g = texture2D(uScene, vUv).g;
  emission.b = texture2D(uScene, vUv - shift).b;
  emission += texture2D(uBloom, vUv).rgb * uBloomStrength;
  vec3 light = neutral(max(emission, 0.0));
  light = pow(light, vec3(1.0 / 2.2));
  vec3 color = 1.0 - (1.0 - uBackground) * (1.0 - light);
  float l = max(light.r, max(light.g, light.b));
  float mask = smoothstep(0.0, 0.04, l);
  color += n * uGrain * 0.1 * mask;
  color += (hash(gl_FragCoord.xy * 1.7) - 0.5) / 255.0 * mask;
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

interface RuntimeState {
  colors: [string, string];
  backgroundColor: string;
  horizon: number;
  curvature: number;
  tilt: number;
  sunPosition: number;
  sunrise: number;
  spread: number;
  atmosphere: number;
  thickness: number;
  rim: number;
  flare: number;
  airglow: number;
  clouds: number;
  stars: number;
  aurora: number;
  autoAurora: boolean;
  speed: number;
  drift: number;
  parallax: number;
  bloom: number;
  grain: number;
  interactive: boolean;
  intro: boolean;
  paused: boolean;
  dpr: number;
  reduced: boolean;
}

interface AuroraInstance {
  arc: number;
  born: number;
  strength: number;
  seed: number;
  dying: number;
}

interface RenderTarget {
  fbo: WebGLFramebuffer | null;
  texture: WebGLTexture | null;
  width: number;
  height: number;
  setSize: (w: number, h: number) => void;
  dispose: () => void;
}

export const HorizonBloom = forwardRef<HorizonBloomRef, HorizonBloomProps>(function HorizonBloom(
  {
    colors = ["#FF9FFC", "#5227FF"],
    backgroundColor = "transparent",
    horizon = 0.72,
    curvature = 1,
    tilt = 0,
    sunPosition = 0.15,
    sunrise = 1,
    spread = 0.4,
    atmosphere = 1,
    thickness = 1,
    rim = 1,
    flare = 1,
    airglow = 0.5,
    clouds = 0.5,
    stars = 0.5,
    aurora = 1,
    autoAurora = false,
    speed = 0.5,
    drift = 0.5,
    parallax = 0.5,
    bloom = 0.5,
    grain = 0.25,
    interactive = true,
    intro = true,
    paused = false,
    dpr = 2,
    children,
    className,
    style,
  },
  ref
) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<{
    sync: () => void;
    bloom: (x?: number, strength?: number) => void;
    replay: () => void;
    destroy: () => void;
  } | null>(null);

  const currentProps: RuntimeState = {
    colors,
    backgroundColor,
    horizon,
    curvature,
    tilt,
    sunPosition,
    sunrise,
    spread,
    atmosphere,
    thickness,
    rim,
    flare,
    airglow,
    clouds,
    stars,
    aurora,
    autoAurora,
    speed,
    drift,
    parallax,
    bloom,
    grain,
    interactive,
    intro,
    paused,
    dpr,
    reduced: useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false),
  };

  const stateRef = useRef<RuntimeState>(currentProps);

  useEffect(() => {
    stateRef.current = currentProps;
    controllerRef.current?.sync();
  });

  useEffect(() => {
    const rootEl = rootRef.current;
    const hostEl = canvasHostRef.current;
    if (!rootEl || !hostEl) return;

    const createController = (
      container: HTMLDivElement,
      mount: HTMLDivElement,
      propsRef: React.MutableRefObject<RuntimeState>
    ) => {
      if (
        typeof WebGLRenderingContext === "undefined" &&
        typeof WebGL2RenderingContext === "undefined"
      ) {
        return null;
      }

      const doc = container.ownerDocument;
      const win = doc.defaultView ?? window;
      const canvas = doc.createElement("canvas");
      canvas.setAttribute("aria-hidden", "true");
      canvas.style.cssText =
        "position:absolute;inset:0;width:100%;height:100%;display:block";

      const ctxAttrs: WebGLContextAttributes = {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "high-performance",
      };

      let gl: WebGL2RenderingContext | WebGLRenderingContext | null = null;
      let isWebGL2 = false;
      try {
        gl = canvas.getContext("webgl2", ctxAttrs) as WebGL2RenderingContext | null;
        if (gl) {
          isWebGL2 = true;
        } else {
          gl = canvas.getContext("webgl", ctxAttrs) as WebGLRenderingContext | null;
        }
      } catch {
        gl = null;
      }
      if (!gl) return null;

      mount.appendChild(canvas);

      let fboInternalFormat: number = gl.RGBA;
      let fboType: number = gl.UNSIGNED_BYTE;

      if (isWebGL2) {
        const gl2 = gl as WebGL2RenderingContext;
        if (gl2.getExtension("EXT_color_buffer_float") || gl2.getExtension("EXT_color_buffer_half_float")) {
          fboInternalFormat = gl2.RGBA16F;
          fboType = gl2.HALF_FLOAT;
        }
      } else {
        const halfFloat = gl.getExtension("OES_texture_half_float");
        const halfFloatLinear = gl.getExtension("OES_texture_half_float_linear");
        if (halfFloat && halfFloatLinear) {
          fboType = halfFloat.HALF_FLOAT_OES;
        }
      }

      const compileShader = (type: number, source: string) => {
        const shader = gl!.createShader(type);
        if (!shader) return null;
        gl!.shaderSource(shader, source);
        gl!.compileShader(shader);
        if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
          gl!.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const createProgram = (fragSource: string) => {
        const vs = compileShader(gl!.VERTEX_SHADER, VERTEX_SHADER);
        const fs = compileShader(gl!.FRAGMENT_SHADER, fragSource);
        if (!vs || !fs) return null;
        const prog = gl!.createProgram();
        if (!prog) return null;
        gl!.attachShader(prog, vs);
        gl!.attachShader(prog, fs);
        gl!.bindAttribLocation(prog, 0, "position");
        gl!.linkProgram(prog);
        gl!.deleteShader(vs);
        gl!.deleteShader(fs);
        if (!gl!.getProgramParameter(prog, gl!.LINK_STATUS)) {
          gl!.deleteProgram(prog);
          return null;
        }
        return prog;
      };

      const sceneProg = createProgram(SCENE_FRAGMENT_SHADER);
      const downProg = createProgram(DOWN_FRAGMENT_SHADER);
      const upProg = createProgram(UP_FRAGMENT_SHADER);
      const compProg = createProgram(COMPOSITE_FRAGMENT_SHADER);

      if (!sceneProg || !downProg || !upProg || !compProg) {
        canvas.remove();
        return null;
      }

      const quadBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      const uLoc = (prog: WebGLProgram, name: string) => gl!.getUniformLocation(prog, name);

      const sceneLocs = {
        uRes: uLoc(sceneProg, "uRes"),
        uTime: uLoc(sceneProg, "uTime"),
        uRoll: uLoc(sceneProg, "uRoll"),
        uApex: uLoc(sceneProg, "uApex"),
        uRadius: uLoc(sceneProg, "uRadius"),
        uSunArc: uLoc(sceneProg, "uSunArc"),
        uSpread: uLoc(sceneProg, "uSpread"),
        uSunUp: uLoc(sceneProg, "uSunUp"),
        uAtmo: uLoc(sceneProg, "uAtmo"),
        uThick: uLoc(sceneProg, "uThick"),
        uRimGain: uLoc(sceneProg, "uRimGain"),
        uFlare: uLoc(sceneProg, "uFlare"),
        uAirglow: uLoc(sceneProg, "uAirglow"),
        uClouds: uLoc(sceneProg, "uClouds"),
        uStars: uLoc(sceneProg, "uStars"),
        uAuroraGain: uLoc(sceneProg, "uAuroraGain"),
        uAuroras: uLoc(sceneProg, "uAuroras[0]"),
        uInk: uLoc(sceneProg, "uInk"),
        uRimColor: uLoc(sceneProg, "uRimColor"),
        uInner: uLoc(sceneProg, "uInner"),
        uMid: uLoc(sceneProg, "uMid"),
        uOuter: uLoc(sceneProg, "uOuter"),
        uGlowColor: uLoc(sceneProg, "uGlowColor"),
        uSunColor: uLoc(sceneProg, "uSunColor"),
        uStarColor: uLoc(sceneProg, "uStarColor"),
      };

      const downLocs = {
        uSource: uLoc(downProg, "uSource"),
        uTexel: uLoc(downProg, "uTexel"),
        uThreshold: uLoc(downProg, "uThreshold"),
      };

      const upLocs = {
        uSource: uLoc(upProg, "uSource"),
        uTexel: uLoc(upProg, "uTexel"),
      };

      const compLocs = {
        uScene: uLoc(compProg, "uScene"),
        uBloom: uLoc(compProg, "uBloom"),
        uBackground: uLoc(compProg, "uBackground"),
        uResolution: uLoc(compProg, "uResolution"),
        uBloomStrength: uLoc(compProg, "uBloomStrength"),
        uGrain: uLoc(compProg, "uGrain"),
        uTime: uLoc(compProg, "uTime"),
        uInk: uLoc(compProg, "uInk"),
      };

      const createTarget = (): RenderTarget => {
        const fbo = gl!.createFramebuffer();
        const texture = gl!.createTexture();
        gl!.bindTexture(gl!.TEXTURE_2D, texture);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
        gl!.texImage2D(gl!.TEXTURE_2D, 0, fboInternalFormat, 1, 1, 0, gl!.RGBA, fboType, null);
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
        gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, texture, 0);
        if (gl!.checkFramebufferStatus(gl!.FRAMEBUFFER) !== gl!.FRAMEBUFFER_COMPLETE) {
          fboInternalFormat = gl!.RGBA;
          fboType = gl!.UNSIGNED_BYTE;
          gl!.texImage2D(gl!.TEXTURE_2D, 0, fboInternalFormat, 1, 1, 0, gl!.RGBA, fboType, null);
        }
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
        const rt: RenderTarget = {
          fbo,
          texture,
          width: 1,
          height: 1,
          setSize(w: number, h: number) {
            if (w === rt.width && h === rt.height) return;
            rt.width = w;
            rt.height = h;
            gl!.bindTexture(gl!.TEXTURE_2D, texture);
            gl!.texImage2D(gl!.TEXTURE_2D, 0, fboInternalFormat, w, h, 0, gl!.RGBA, fboType, null);
          },
          dispose() {
            if (texture) gl!.deleteTexture(texture);
            if (fbo) gl!.deleteFramebuffer(fbo);
          },
        };
        return rt;
      };

      const sceneTarget = createTarget();
      const bloomChain = Array.from({ length: 5 }, createTarget);

      const colorsState: Record<string, [number, number, number]> = {
        uRimColor: [1, 1, 1],
        uInner: [1, 1, 1],
        uMid: [1, 1, 1],
        uOuter: [1, 1, 1],
        uGlowColor: [1, 1, 1],
        uSunColor: [1, 1, 1],
        uStarColor: [1, 1, 1],
      };

      const auroraData = new Float32Array(32);

      let width = 0;
      let height = 0;
      let pixelRatio = 1;
      let hasSize = false;
      let colorCacheKey = "";
      let isLightBg = false;
      let bgRgb: [number, number, number] = [0.04, 0.04, 0.04];
      let lastColorSync = -10;
      let scaledTime = 0;
      let realTime = 0;
      let introStart = -1;
      let introProgress = 1;
      let rollOffset = 0;
      let apexOffset = 0;
      let targetRollOffset = 0;
      let targetApexOffset = 0;
      let nextAutoAurora = 4;
      let rngState = 11;
      let rafId = 0;
      let lastFrameTime = 0;
      let isIntersecting = false;
      let isDestroyed = false;
      let isContextLost = false;
      const auroras: AuroraInstance[] = [];

      const nextRandom = () => ((rngState = (16807 * rngState) % 0x7fffffff) - 1) / 0x7ffffffe;

      const setColorUniform = (name: string, rgb: [number, number, number]) => {
        if (isLightBg) {
          colorsState[name] = [rgb[0], rgb[1], rgb[2]];
        } else {
          colorsState[name] = [
            srgbToLinear(rgb[0]),
            srgbToLinear(rgb[1]),
            srgbToLinear(rgb[2]),
          ];
        }
      };

      const syncColors = () => {
        const st = propsRef.current;
        bgRgb =
          parseColor(st.backgroundColor) ??
          (() => {
            let el: HTMLElement | null = container.parentElement;
            while (el) {
              const match = win.getComputedStyle(el).backgroundColor.match(/rgba?\(([^)]+)\)/);
              if (match) {
                const parts = match[1].split(",").map((part) => Number.parseFloat(part));
                if (parts.length < 4 || parts[3] > 0.05) {
                  return [parts[0] / 255, parts[1] / 255, parts[2] / 255];
                }
              }
              el = el.parentElement;
            }
            const fgMatch = win.getComputedStyle(container).color.match(/rgba?\(([^)]+)\)/);
            if (fgMatch) {
              const parts = fgMatch[1].split(",").map((part) => Number.parseFloat(part));
              return parts[0] + parts[1] + parts[2] > 382 ? [0.04, 0.04, 0.04] : [1, 1, 1];
            }
            return [0.04, 0.04, 0.04];
          })();

        const key = [bgRgb.join(","), st.colors[0], st.colors[1]].join("|");
        if (key === colorCacheKey) return;
        colorCacheKey = key;

        isLightBg = 0.2126 * bgRgb[0] + 0.7152 * bgRgb[1] + 0.0722 * bgRgb[2] > 0.55;

        const warmLab = rgbToOklab(parseColor(st.colors[0]) ?? [1, 0.62, 0.99]);
        const coolLab = rgbToOklab(parseColor(st.colors[1]) ?? [0.32, 0.15, 1]);

        const toInk = (lab: [number, number, number], lightness: number): [number, number, number] => {
          const chroma = Math.hypot(lab[1], lab[2]);
          if (chroma < 0.02) return [0.8 * lightness, 0, 0];
          const boost = Math.max(1, 0.15 / chroma);
          return [lightness, lab[1] * boost, lab[2] * boost];
        };

        const midLab = mixVec3(warmLab, coolLab, 0.55);
        const glowLab = mixVec3(warmLab, coolLab, 0.35);
        const brighten = (
          lab: [number, number, number],
          minL: number,
          chromaScale: number
        ): [number, number, number] => [Math.max(lab[0], minL), lab[1] * chromaScale, lab[2] * chromaScale];

        if (isLightBg) {
          setColorUniform("uRimColor", oklabToRgb(toInk(mixVec3(warmLab, coolLab, 0.7), 0.42)));
          setColorUniform("uInner", oklabToRgb(toInk(warmLab, 0.62)));
          setColorUniform("uMid", oklabToRgb(toInk(midLab, 0.55)));
          setColorUniform("uOuter", oklabToRgb(toInk(coolLab, 0.5)));
          setColorUniform("uGlowColor", oklabToRgb(toInk(glowLab, 0.58)));
          setColorUniform("uSunColor", oklabToRgb(toInk(mixVec3(warmLab, coolLab, 0.5), 0.48)));
          setColorUniform("uStarColor", oklabToRgb(toInk(coolLab, 0.5)));
        } else {
          setColorUniform("uRimColor", oklabToRgb(brighten(warmLab, 0.96, 0.22)));
          setColorUniform("uInner", oklabToRgb(warmLab));
          setColorUniform("uMid", oklabToRgb(midLab));
          setColorUniform("uOuter", oklabToRgb(coolLab));
          setColorUniform("uGlowColor", oklabToRgb(brighten(glowLab, 0.78, 0.7)));
          setColorUniform("uSunColor", oklabToRgb(brighten(warmLab, 0.98, 0.12)));
          setColorUniform("uStarColor", oklabToRgb(brighten(coolLab, 0.93, 0.15)));
        }
      };

      const syncSize = () => {
        const st = propsRef.current;
        const nextW = Math.round(container.clientWidth);
        const nextH = Math.round(container.clientHeight);
        if (nextW < 2 || nextH < 2) {
          hasSize = false;
          return false;
        }
        const nextDpr = Math.min(win.devicePixelRatio || 1, clamp(finiteOr(st.dpr, 2), 0.5, 3));
        if (hasSize && nextW === width && nextH === height && nextDpr === pixelRatio) {
          return false;
        }
        hasSize = true;
        width = nextW;
        height = nextH;
        pixelRatio = nextDpr;

        const rw = Math.round(width * pixelRatio);
        const rh = Math.round(height * pixelRatio);
        canvas.width = rw;
        canvas.height = rh;
        sceneTarget.setSize(rw, rh);

        let bw = rw;
        let bh = rh;
        for (const target of bloomChain) {
          bw = Math.max(1, Math.round(bw / 2));
          bh = Math.max(1, Math.round(bh / 2));
          target.setSize(bw, bh);
        }
        return true;
      };

      const computeRadius = () =>
        (2.4 / clamp(finiteOr(propsRef.current.curvature, 1), 0.08, 6)) *
        clamp(width / Math.max(height, 1) / 1.6, 0.42, 1);

      const computeApex = () => 0.5 - clamp(finiteOr(propsRef.current.horizon, 0.72), 0.15, 1.1);

      const computeSunArc = () => {
        const st = propsRef.current;
        const aspect = width / Math.max(height, 1);
        const offset = clamp(finiteOr(st.sunPosition, 0.15), -1.2, 1.2) * aspect * 0.42;
        const radius = computeRadius();
        const wander = st.reduced
          ? 0
          : 0.03 * clamp(finiteOr(st.drift, 0.5), 0, 2) * Math.sin(0.05 * scaledTime);
        return Math.asin(clamp(offset / radius, -0.99, 0.99)) * radius + wander;
      };

      const renderFrame = () => {
        if (!hasSize || !gl) return;
        const st = propsRef.current;
        if (performance.now() - lastColorSync > 1000) {
          lastColorSync = performance.now();
          syncColors();
        }

        const rw = sceneTarget.width;
        const rh = sceneTarget.height;
        const tiltRad = (clamp(finiteOr(st.tilt, 0), -180, 180) * Math.PI) / 180;
        const targetSpread = 0.08 + 1.1 * clamp(finiteOr(st.spread, 0.4), 0, 3);

        for (let i = 0; i < 8; i++) {
          const item = auroras[i];
          const baseIdx = i * 4;
          if (item) {
            const fade = item.dying < 0 ? 1 : clamp(1 - (realTime - item.dying) / 0.7, 0, 1);
            auroraData[baseIdx] = item.arc;
            auroraData[baseIdx + 1] = realTime - item.born;
            auroraData[baseIdx + 2] = item.strength * fade * fade;
            auroraData[baseIdx + 3] = item.seed;
          } else {
            auroraData[baseIdx] = 0;
            auroraData[baseIdx + 1] = 0;
            auroraData[baseIdx + 2] = 0;
            auroraData[baseIdx + 3] = 0;
          }
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.disable(gl.BLEND);

        // Pass 1: Scene
        gl.bindFramebuffer(gl.FRAMEBUFFER, sceneTarget.fbo);
        gl.viewport(0, 0, rw, rh);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(sceneProg);

        gl.uniform2f(sceneLocs.uRes, rw, rh);
        gl.uniform1f(sceneLocs.uTime, scaledTime);
        gl.uniform1f(sceneLocs.uRoll, tiltRad + rollOffset);
        gl.uniform1f(sceneLocs.uApex, computeApex() + apexOffset);
        gl.uniform1f(sceneLocs.uRadius, computeRadius());
        gl.uniform1f(sceneLocs.uSunArc, computeSunArc());
        gl.uniform1f(
          sceneLocs.uSpread,
          0.05 + (targetSpread - 0.05) * (0.15 + 0.85 * introProgress)
        );
        gl.uniform1f(
          sceneLocs.uSunUp,
          clamp(finiteOr(st.sunrise, 1), 0, 1.5) * (0.12 + 0.88 * introProgress)
        );
        gl.uniform1f(sceneLocs.uAtmo, clamp(finiteOr(st.atmosphere, 1), 0, 3));
        gl.uniform1f(sceneLocs.uThick, clamp(finiteOr(st.thickness, 1), 0.3, 3));
        gl.uniform1f(sceneLocs.uRimGain, clamp(finiteOr(st.rim, 1), 0, 3));
        gl.uniform1f(sceneLocs.uFlare, clamp(finiteOr(st.flare, 1), 0, 3));
        gl.uniform1f(sceneLocs.uAirglow, clamp(finiteOr(st.airglow, 0.5), 0, 2));
        gl.uniform1f(sceneLocs.uClouds, clamp(finiteOr(st.clouds, 0.5), 0, 2));
        gl.uniform1f(sceneLocs.uStars, clamp(finiteOr(st.stars, 0.5), 0, 2));
        gl.uniform1f(sceneLocs.uAuroraGain, clamp(finiteOr(st.aurora, 1), 0, 3));
        gl.uniform4fv(sceneLocs.uAuroras, auroraData);
        gl.uniform1f(sceneLocs.uInk, isLightBg ? 1 : 0);

        gl.uniform3fv(sceneLocs.uRimColor, colorsState.uRimColor);
        gl.uniform3fv(sceneLocs.uInner, colorsState.uInner);
        gl.uniform3fv(sceneLocs.uMid, colorsState.uMid);
        gl.uniform3fv(sceneLocs.uOuter, colorsState.uOuter);
        gl.uniform3fv(sceneLocs.uGlowColor, colorsState.uGlowColor);
        gl.uniform3fv(sceneLocs.uSunColor, colorsState.uSunColor);
        gl.uniform3fv(sceneLocs.uStarColor, colorsState.uStarColor);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // Pass 2: Bloom downsample & upsample
        const bloomStrength = isLightBg ? 0 : clamp(finiteOr(st.bloom, 0.5), 0, 3);
        if (bloomStrength > 0.001) {
          let prev = sceneTarget;
          gl.useProgram(downProg);
          gl.uniform1i(downLocs.uSource, 0);
          gl.activeTexture(gl.TEXTURE0);

          for (const target of bloomChain) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
            gl.viewport(0, 0, target.width, target.height);
            gl.bindTexture(gl.TEXTURE_2D, prev.texture);
            gl.uniform1f(downLocs.uThreshold, prev === sceneTarget ? 0.45 : 0);
            gl.uniform2f(downLocs.uTexel, 1 / prev.width, 1 / prev.height);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            prev = target;
          }

          gl.useProgram(upProg);
          gl.uniform1i(upLocs.uSource, 0);
          gl.enable(gl.BLEND);
          gl.blendFunc(gl.ONE, gl.ONE);

          for (let i = bloomChain.length - 1; i > 0; i--) {
            const src = bloomChain[i];
            const dst = bloomChain[i - 1];
            gl.bindFramebuffer(gl.FRAMEBUFFER, dst.fbo);
            gl.viewport(0, 0, dst.width, dst.height);
            gl.bindTexture(gl.TEXTURE_2D, src.texture);
            gl.uniform2f(upLocs.uTexel, 1 / src.width, 1 / src.height);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
          }

          gl.disable(gl.BLEND);
        }

        // Pass 3: Composite
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, rw, rh);
        gl.useProgram(compProg);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, sceneTarget.texture);
        gl.uniform1i(compLocs.uScene, 0);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, bloomChain[0].texture);
        gl.uniform1i(compLocs.uBloom, 1);

        gl.uniform3f(compLocs.uBackground, bgRgb[0], bgRgb[1], bgRgb[2]);
        gl.uniform2f(compLocs.uResolution, rw, rh);
        gl.uniform1f(compLocs.uBloomStrength, bloomStrength);
        gl.uniform1f(compLocs.uGrain, clamp(finiteOr(st.grain, 0.25), 0, 1));
        gl.uniform1f(compLocs.uTime, scaledTime);
        gl.uniform1f(compLocs.uInk, isLightBg ? 1 : 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      };

      const clientToArc = (clientX: number, clientY: number) => {
        const rect = container.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return null;
        const st = propsRef.current;
        const nx = ((clientX - rect.left) / rect.width - 0.5) * (rect.width / rect.height);
        const ny = 0.5 - (clientY - rect.top) / rect.height;
        const angle = (clamp(finiteOr(st.tilt, 0), -180, 180) * Math.PI) / 180 + rollOffset;
        const rx = Math.cos(angle) * nx - Math.sin(angle) * ny;
        const ry = Math.sin(angle) * nx + Math.cos(angle) * ny;
        const radius = computeRadius();
        return Math.atan2(rx, ry - (computeApex() + apexOffset - radius)) * radius;
      };

      const spawnAurora = (arc: number, strength: number) => {
        const active = auroras.filter((a) => a.dying < 0);
        if (active.length >= 5) {
          active[0].dying = realTime;
        }
        if (auroras.length < 8) {
          auroras.push({
            arc,
            born: realTime,
            strength,
            seed: 40 * nextRandom(),
            dying: -1,
          });
        }
      };

      let ambientActive = Boolean(propsRef.current.intro);

      const scheduleTick = () => {
        if (!isDestroyed && !isContextLost && isIntersecting && !rafId) {
          rafId = requestAnimationFrame(tick);
        }
      };

      const activateAmbient = () => {
        if (!ambientActive) {
          ambientActive = true;
          scheduleTick();
        }
      };

      const tick = (now: number) => {
        rafId = 0;
        if (isDestroyed || isContextLost) return;
        const st = propsRef.current;
        const dt =
          lastFrameTime && now - lastFrameTime < 100
            ? Math.min(Math.max((now - lastFrameTime) / 1000, 0), 0.05)
            : 1 / 60;
        lastFrameTime = now;

        const running = !st.reduced && !st.paused && ambientActive;
        if (running) {
          realTime += dt;
          scaledTime += dt * clamp(finiteOr(st.speed, 0.5), 0, 3);
        }

        if (st.intro && !st.reduced) {
          if (introStart < 0) introStart = now;
          const t = clamp((now - introStart) / 6500, 0, 1);
          introProgress = t * t * (3 - 2 * t);
        } else {
          introProgress = 1;
        }

        const ease = st.reduced ? 1 : 1 - Math.exp(-dt / 0.55);
        rollOffset += (targetRollOffset - rollOffset) * ease;
        apexOffset += (targetApexOffset - apexOffset) * ease;

        for (let i = auroras.length - 1; i >= 0; i--) {
          if (
            realTime - auroras[i].born > 6.7 ||
            (auroras[i].dying >= 0 && realTime - auroras[i].dying > 0.7)
          ) {
            auroras.splice(i, 1);
          }
        }

        if (
          running &&
          st.autoAurora &&
          clamp(finiteOr(st.aurora, 1), 0, 3) > 0 &&
          realTime >= nextAutoAurora
        ) {
          const s = 0.08 + 1.1 * clamp(finiteOr(st.spread, 0.4), 0, 3);
          spawnAurora(
            computeSunArc() + (nextRandom() - 0.5) * s * 2.4,
            0.6 + 0.5 * nextRandom()
          );
          nextAutoAurora = realTime + 5 + 6 * nextRandom();
        }

        renderFrame();

        const hasParallaxDelta =
          Math.abs(targetRollOffset - rollOffset) > 5e-5 ||
          Math.abs(targetApexOffset - apexOffset) > 5e-5;

        if ((running || hasParallaxDelta || introProgress < 1 || auroras.length > 0) && !document.hidden) {
          rafId = requestAnimationFrame(tick);
        } else {
          lastFrameTime = 0;
        }
      };

      const onPointerMove = (e: PointerEvent) => {
        ambientActive = true;
        const st = propsRef.current;
        if (!st.interactive || st.reduced || e.pointerType === "touch") return;
        const rect = container.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;
        const p = clamp(finiteOr(st.parallax, 0.5), 0, 2);
        const dx = clamp((e.clientX - rect.left) / rect.width, 0, 1) - 0.5;
        const dy = clamp((e.clientY - rect.top) / rect.height, 0, 1) - 0.5;
        targetRollOffset = -(0.07 * dx) * p;
        targetApexOffset = -(0.05 * dy) * p;
        scheduleTick();
      };

      const onPointerLeave = () => {
        targetRollOffset = 0;
        targetApexOffset = 0;
        scheduleTick();
      };

      let downState: { id: number; x: number; y: number; time: number } | null = null;

      const onPointerDown = (e: PointerEvent) => {
        ambientActive = true;
        downState = null;
        const st = propsRef.current;
        if (
          st.interactive &&
          !st.reduced &&
          !st.paused &&
          e.isPrimary &&
          (e.pointerType !== "mouse" || e.button === 0)
        ) {
          const target = e.target as HTMLElement | null;
          if (
            target &&
            typeof target.closest === "function" &&
            target.closest(
              "a,button,input,textarea,select,label,summary,[role=button],[contenteditable=true]"
            )
          ) {
            return;
          }
          downState = {
            id: e.pointerId,
            x: e.clientX,
            y: e.clientY,
            time: performance.now(),
          };
        }
      };

      const onPointerUp = (e: PointerEvent) => {
        const prev = downState;
        downState = null;
        if (
          !prev ||
          prev.id !== e.pointerId ||
          Math.hypot(e.clientX - prev.x, e.clientY - prev.y) > 10 ||
          performance.now() - prev.time > 500 ||
          clamp(finiteOr(propsRef.current.aurora, 1), 0, 3) <= 0
        ) {
          return;
        }
        const arc = clientToArc(e.clientX, e.clientY);
        if (arc !== null) {
          spawnAurora(arc, 1);
          scheduleTick();
        }
      };

      const onPointerCancel = () => {
        downState = null;
      };

      const onVisibilityChange = () => {
        lastFrameTime = 0;
        scheduleTick();
      };

      const onContextLost = (e: Event) => {
        e.preventDefault();
        isContextLost = true;
        cancelAnimationFrame(rafId);
        rafId = 0;
      };

      const onContextRestored = () => {
        isContextLost = false;
        colorCacheKey = "";
        scheduleTick();
      };

      const resizeObserver =
        typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(() => {
              if (syncSize()) {
                renderFrame();
                scheduleTick();
              }
            })
          : null;

      const intersectionObserver =
        typeof IntersectionObserver !== "undefined"
          ? new IntersectionObserver(
              ([entry]) => {
                isIntersecting = entry.isIntersecting;
                lastFrameTime = 0;
                if (isIntersecting && ambientActive) {
                  scheduleTick();
                }
              },
              { rootMargin: "120px" }
            )
          : null;

      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerleave", onPointerLeave);
      container.addEventListener("pointerdown", onPointerDown);
      container.addEventListener("pointerup", onPointerUp);
      container.addEventListener("pointercancel", onPointerCancel);
      win.addEventListener("scroll", activateAmbient, { passive: true, once: true });
      win.addEventListener("keydown", activateAmbient, { passive: true, once: true });
      document.addEventListener("visibilitychange", onVisibilityChange);
      canvas.addEventListener("webglcontextlost", onContextLost);
      canvas.addEventListener("webglcontextrestored", onContextRestored);
      resizeObserver?.observe(container);
      intersectionObserver?.observe(container);

      syncSize();
      syncColors();
      isIntersecting = true;
      renderFrame();
      if (ambientActive) {
        scheduleTick();
      }

      return {
        sync: () => {
          lastColorSync = -10;
          syncSize();
          lastFrameTime = 0;
          if (!rafId && isIntersecting) {
            renderFrame();
            if (ambientActive) {
              scheduleTick();
            }
          }
        },
        bloom: (x?: number, strength?: number) => {
          if (propsRef.current.reduced) return;
          ambientActive = true;
          const rect = container.getBoundingClientRect();
          const arc = clientToArc(
            rect.left + clamp(x ?? 0.5, 0, 1) * rect.width,
            rect.top + 0.5 * rect.height
          );
          if (arc !== null) {
            spawnAurora(arc, clamp(finiteOr(strength ?? 1, 1), 0, 3));
            scheduleTick();
          }
        },
        replay: () => {
          ambientActive = true;
          introStart = -1;
          introProgress = 0;
          lastFrameTime = 0;
          scheduleTick();
        },
        destroy: () => {
          isDestroyed = true;
          cancelAnimationFrame(rafId);
          resizeObserver?.disconnect();
          intersectionObserver?.disconnect();
          container.removeEventListener("pointermove", onPointerMove);
          container.removeEventListener("pointerleave", onPointerLeave);
          container.removeEventListener("pointerdown", onPointerDown);
          container.removeEventListener("pointerup", onPointerUp);
          container.removeEventListener("pointercancel", onPointerCancel);
          win.removeEventListener("scroll", activateAmbient);
          win.removeEventListener("keydown", activateAmbient);
          document.removeEventListener("visibilitychange", onVisibilityChange);
          canvas.removeEventListener("webglcontextlost", onContextLost);
          canvas.removeEventListener("webglcontextrestored", onContextRestored);
          if (quadBuffer) gl?.deleteBuffer(quadBuffer);
          gl?.deleteProgram(sceneProg);
          gl?.deleteProgram(downProg);
          gl?.deleteProgram(upProg);
          gl?.deleteProgram(compProg);
          sceneTarget.dispose();
          for (const target of bloomChain) {
            target.dispose();
          }
          canvas.remove();
        },
      };
    };

    const ctrl = createController(rootEl, hostEl, stateRef);
    controllerRef.current = ctrl;
    return () => {
      ctrl?.destroy();
      controllerRef.current = null;
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      bloom: (x?: number, strength?: number) => controllerRef.current?.bloom(x, strength),
      replay: () => controllerRef.current?.replay(),
    }),
    []
  );

  const normalizedBg = backgroundColor.trim().toLowerCase();

  return (
    <div
      ref={rootRef}
      className={cn("relative isolate h-full min-h-[320px] w-full overflow-hidden", className)}
      style={{
        backgroundColor:
          normalizedBg === "transparent" || normalizedBg === "" ? undefined : backgroundColor,
        touchAction: "pan-y",
        ...style,
      }}
    >
      <div
        ref={canvasHostRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 65% 32% at 56% 72%, rgba(255, 159, 252, 0.38) 0%, rgba(82, 39, 255, 0.28) 45%, transparent 78%)",
        }}
      />
      {children ? (
        <div style={{ position: "relative", zIndex: 1, height: "100%" }}>{children}</div>
      ) : null}
    </div>
  );
});

HorizonBloom.displayName = "HorizonBloom";

export default HorizonBloom;
