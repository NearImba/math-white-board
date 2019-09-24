attribute vec4 a_Position;
attribute vec4 a_SpecifiedColor;
attribute float a_Selected;

$uniforms

varying vec3 v_SpecifiedColor;
varying float v_Selected;

void main() {
    vec2 u_Start = a_Position.xy;
    vec2 u_End = a_Position.zw;
    float index = a_SpecifiedColor.w;
    v_SpecifiedColor = a_SpecifiedColor.xyz;
    v_Selected = a_Selected;
    float lw = 0.0025 * 800.0 / u_Resolution.x; // 线宽
    if(u_Picking) {
        lw = 0.01; // 拾取时增加宽度
    }
    float aspect = u_Resolution.x / u_Resolution.y;
    vec2 start = u_Start + u_Translate;
    vec2 end = u_End + u_Translate;
    start.y /= aspect;
    end.y /= aspect;
    vec2 n1 = end - start;
    vec2 n2 = vec2(-n1.y, n1.x);
    vec2 nn = lw * normalize(n2);
    vec2 r = vec2(0.0);
    if(index == 0.0) {
        r = start + nn;
    }

    if(index == 1.0) {
        r = start - nn;
    }

    if(index == 2.0) {
        r = end - nn;
    }

    if(index == 3.0) {
        r = end + nn;
    }

    r.y *= aspect;

    gl_Position = vec4(r, 0.0, 1.0);
    //gl_Position = vec4(a_Position.x + index * 0.1, 0.1, 1.0, 1.0);
    gl_PointSize = 2.0;
}