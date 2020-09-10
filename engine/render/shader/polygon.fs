$fsheader

$uniforms

varying float v_Selected;
varying vec3 v_SpecifiedColor;
vec4 bgColor = vec4(1.0, 0.0, 0.0, 0.5);

void main() {
    if(u_Picking) {
        gl_FragColor = vec4(v_SpecifiedColor, 1.0);
    } else if(v_Selected > 0.0){
        gl_FragColor = vec4(u_SelectedColor, 0.5);
    } else {
        gl_FragColor = vec4(u_Color, 0.5);
    }
}