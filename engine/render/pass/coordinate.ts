import Types from "../../base/types";
import Store from "../../store/index";
import { steps, renderSafeSpacing } from '../../config'

const SIZE = Float32Array.BYTES_PER_ELEMENT;

export default function renderCoordinate(gl: WebGLRenderingContext, type: Types, store: Store, map: Map<string, WebGLProgram>) {
    switch (type) {
        case Types.Coordinate:
            const currentProgram = map.get('coordinate')
            gl.useProgram(currentProgram)
            const aPosition2 = gl.getAttribLocation(currentProgram, "a_Position");
            gl.vertexAttribPointer(aPosition2, 2, gl.FLOAT, false, SIZE * 2, 0);
            gl.enableVertexAttribArray(aPosition2)
            const resolution = gl.getUniformLocation(currentProgram, "u_Resolution");
            const uConfig = gl.getUniformLocation(currentProgram, "u_Config");
            const uTranslate = gl.getUniformLocation(currentProgram, 'u_Translate');
            const size = store.getSize()

            gl.uniform2f(resolution, size.width, size.height);
            gl.uniform3f(uConfig, renderSafeSpacing[store.SI % 2], store.AS, store.X);
            const translate = store.getTranslate();
            gl.uniform2f(uTranslate, translate.x / store.X, translate.y / (store.X * store.AS));
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
            break;
        default:
            break;
    }
}