attribute vec4 a_Position;
attribute float a_Selected;
attribute vec3 a_SpecifiedColor;

uniform vec2 u_Translate;

varying float v_Selected;
varying vec3 v_SpecifiedColor;
void main() {
    gl_Position = a_Position;
    gl_Position.x += u_Translate.x;
    gl_Position.y += u_Translate.y;
    gl_PointSize = 13.0;
    v_Selected = a_Selected;
    v_SpecifiedColor = a_SpecifiedColor;
}