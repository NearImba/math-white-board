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
    float step = u_Config.x;
    // vec2 pt = (gl_FragCoord.xy - 0.5) / u_Resolution.xy -.5 - u_Translate * 0.5;
    // vec2 pt = v_Position.xy - u_Translate;

    vec2 pt = (gl_FragCoord.xy - 0.5) - u_Resolution * 0.5;
    vec2 translate = vec2(u_Translate.x * u_Resolution.x * 0.5, u_Translate.y * u_Resolution.y * 0.5);
    pt -= translate;

    gl_FragColor = bgColor;

    vec2 pc = abs(pt);

    float w1 = 0.08;
    float step1 = step / 5.0;
    vec2 p1 = vec2(mod(pc.x, step1), mod(pc.y, step1));
    vec2 c2 =  vec2((1.0 - w1) * step1);
    if(any(greaterThan(p1, c2))) {
        gl_FragColor = blockColor * 0.4;
    }

    float w = 0.016;
    vec2 p = vec2(mod(pc.x, step), mod(pc.y, step));
    vec2 c1 =  vec2((1.0 - w) * step);
    if(any(greaterThan(p, c1))) {
        gl_FragColor = blockColor;
    }

    if(any(lessThan(pc, vec2(2.0)))) {
        gl_FragColor = crossColor;
    }
}