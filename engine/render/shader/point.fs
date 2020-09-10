$fsheader

$uniforms

varying float v_Selected;
varying vec3 v_SpecifiedColor;

void main() {
    float r = 0.0, delta = 0.0, alpha = 1.0;
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    r = dot(cxy, cxy);
    if (r > 1.0) {
        discard;
    }
    #ifdef GL_OES_standard_derivatives
        delta = fwidth(r);
        alpha = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
    #endif
    if(u_Picking) {
        gl_FragColor = vec4(v_SpecifiedColor, 1.0);
    } else if(v_Selected > 0.0){
        gl_FragColor = vec4(u_SelectedColor, 1.0) * alpha;
    } else {
        gl_FragColor = vec4(u_Color, 1.0) * alpha;
    }
}