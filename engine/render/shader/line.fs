$fsheader

$uniforms

varying vec3 v_SpecifiedColor;
varying float v_Selected;

void main() {
    if(u_Picking) {
        gl_FragColor = vec4(v_SpecifiedColor, 1.0);
    } else if(v_Selected > 0.0){
        gl_FragColor = vec4(u_SelectedColor, 1.0);
    } else {
        gl_FragColor = vec4(u_Color, 1.0);
    }
}