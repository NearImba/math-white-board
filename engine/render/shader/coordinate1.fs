$fsheader

// to be improved
uniform vec2 u_Resolution;
uniform vec2 u_Translate;
uniform vec3 u_Config;

varying vec4 v_Position;

vec4 bgColor = vec4(1.0, 1.0, 1.0, 1.0);

vec4 crossColor = vec4(0.0, 0.0, 1.0, 1.0);

vec4 blockColor = vec4(1.0, 0.0, 0.0, 1.0);

void main() {
    float aspect = u_Config.y;
    float n = u_Config.x;
    vec2 pt = gl_FragCoord.xy / u_Resolution.xy -.5 - u_Translate * 0.5;
    // vec2 pt = v_Position.xy - u_Translate;
    pt.y *= aspect;

    gl_FragColor = bgColor;

    // vec2 p2 = fract(fract(pt) * 10.0);
    // if(any(greaterThan(p2, vec2(0.9)))) {
    //     gl_FragColor = blockColor * smoothstep(0.9, 1.0, max(p2.x, p2.y));
    // }

    float w = 0.008;
    vec2 p = fract(pt * n);   
    if(any(greaterThan(p, vec2(1.0 - w))) || any(lessThan(p, vec2(w)))) {
        gl_FragColor = blockColor;
    }

    float w1 = 0.01;
    vec2 p1 = fract(pt * n * 5.0);   
    if(any(greaterThan(p1, vec2(1.0 - w1))) || any(lessThan(p1, vec2(w1)))) {
        gl_FragColor = blockColor * 0.5;
    }

    vec2 pc = abs(pt);
    if(any(lessThan(pc, vec2(0.004)))) {
        gl_FragColor = crossColor;
    }
}