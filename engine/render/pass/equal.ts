import Equal from '../../mos/equal'
import Store from '../../store/index'
import { createWebGLProgram, createVertexShader, createFragmentShader, transformIntToFloatInString } from '../utils'

import { setGlobalUniforms } from '../programOperation'

const instances: Map<WebGLRenderingContext, Map<string,WebGLProgram>> = new Map()

const vs = `
attribute vec4 a_Position;
varying vec4 v_Position;
void main() {
    v_Position = a_Position;
    gl_Position = a_Position;   
}
`;
const fs = (left: string, right: string) => `
#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_Resolution;
uniform float u_XMax;
uniform vec3 u_Color;
uniform vec3 u_SelectedColor;
uniform vec3 u_SpecifiedColor;
uniform bool u_Selected;
uniform bool u_Picking;
uniform vec2 u_Translate;

uniform mat3 u_P;

varying vec4 v_Position;

float w = 0.01;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}
float left(float x, float y) {
    float a = u_P[0][0];
    float b = u_P[0][1];
    float c = u_P[0][2];
    float d = u_P[1][0];
    float m = u_P[1][1];
    float n = u_P[1][2];
    float q = u_P[2][0];
    float p = u_P[2][1];
    float r = u_P[2][2];
    return ${left};
}

float right(float x, float y) {
    float a = u_P[0][0];
    float b = u_P[0][1];
    float c = u_P[0][2];
    float d = u_P[1][0];
    float m = u_P[1][1];
    float n = u_P[1][2];
    float q = u_P[2][0];
    float p = u_P[2][1];
    float r = u_P[2][2];
    return ${right};
}

float compare(float x, float y) {
    return left(x, y) - right(x, y);
}

void main() {
    vec2 posi = vec2(v_Position) - u_Translate;
    vec2 p1 = u_XMax * vec2(posi.x, posi.y * u_Resolution.y / u_Resolution.x);

    const float samples = 3.0;
    float count = 0.0;
    int dismiss = 0;
    float step = u_XMax / max(u_Resolution.x, u_Resolution.y) * 0.5;
    if(u_Picking) {
        step *= 2.0;
    }

    for (float i = -8.0; i <= 8.0; i+= 4.0) {
        for (float j = -8.0;j <= 8.0; j+= 4.0) {
            float tx = p1.x + i * step;
            float ty = p1.y + j * step;
            float f = compare(tx, ty);
            // 相差过大则
            if(abs(f) > u_XMax * 2.0) {
                dismiss += 1;
            }
            count += (f > 0.0) ? 1.0 : -1.0;
        }
    }


    if((abs(count) > (u_Picking ? 24.0 : 18.0)) || dismiss > 5) {
        discard;
    } else {
        float alpha = 1.0;
        float r = abs(count);
        alpha = 1.0 - smoothstep(10.0, 20.0, r);
        if(u_Picking) {
            gl_FragColor = vec4(u_SpecifiedColor, 1.0);
        } else if(u_Selected){
            gl_FragColor = vec4(u_SelectedColor, 1.0) * alpha;
        } else {
            gl_FragColor = vec4(u_Color, 1.0) * alpha;
        }
    }
}
`;

export default function renderEquals(gl: WebGLRenderingContext, equals: Array<Equal>, store: Store, isPicking: boolean) {
    if(instances.get(gl) ===  undefined) {
        instances.set(gl, new Map<string, WebGLProgram>())
    }

    const ps = instances.get(gl)

    equals.forEach(equal => {
        if(ps.get(equal.data) === undefined) {
            const vs1 = createVertexShader(gl, vs)
            const [left, right] = transformIntToFloatInString(equal.data).split('=')
            const fs1 = createFragmentShader(gl, fs(left, right))
            const p1 = createWebGLProgram(gl, vs1, fs1)
            ps.set(equal.data, p1)
        }

        const p = ps.get(equal.data)
        gl.useProgram(p)
        setGlobalUniforms(gl, p, store, isPicking)
        const uSpecifiedColor = gl.getUniformLocation(p,'u_SpecifiedColor')
        gl.uniform3f(uSpecifiedColor, equal.specifiedColor.x / 255, equal.specifiedColor.y / 255, equal.specifiedColor.z / 255,)
        const uniforms = gl.getUniformLocation(p, 'u_P');
        const u = store.getUniforms()
        const ua: Array<number> = []
        for(let k in u) {
            ua.push(u[k])
        }
        gl.uniformMatrix3fv(uniforms, false, ua);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
    })
}
