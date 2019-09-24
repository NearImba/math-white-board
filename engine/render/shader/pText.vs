attribute vec4 a_Position;
attribute vec2 a_Texcoord;
uniform vec2 u_Translate;
varying vec2 v_Texcoord;
void main() {
    gl_Position = a_Position;
    gl_Position.x += u_Translate.x;
    gl_Position.y += u_Translate.y;
    v_Texcoord =  a_Texcoord;
}