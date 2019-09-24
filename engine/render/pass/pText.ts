import { tags } from '../utils';

const SIZE = Float32Array.BYTES_PER_ELEMENT;
const ww = 56;
const hh = 34;
const L = tags.length;
const M = 100;

const W = L * ww;
const H = M * hh;

let textCanvas: HTMLCanvasElement = null; // 文字集中在这里面

function makeTextCanvas(): HTMLCanvasElement {
    // console.log('text texture initialized');
    const textCtx = document.createElement("canvas").getContext("2d");
    textCtx.canvas.width = W;
    textCtx.canvas.height = H;

    textCtx.textAlign = "left";
    textCtx.textBaseline = "top";
    textCtx.fillStyle = "black";

    for (let n = 0; n < L; n += 1) {
        for (let m = 0; m < M; m += 1) {
            textCtx.font = `32px Menlo`;
            textCtx.fillText(tags[n], n * ww, m * hh);
            textCtx.font = `20px Menlo`;
            textCtx.fillText(m.toString() || '', n * ww + 18, m * hh + 10);
        }
    }

    textCanvas = textCtx.canvas;
    return textCtx.canvas;
}
const map = new Map<WebGLRenderingContext, WebGLTexture>()

export default function renderPointTexts(gl: WebGLRenderingContext, currentProgram: WebGLProgram, start: number, n: number) {
    if (textCanvas === null) {
        textCanvas = makeTextCanvas()
    }

    let thisTexture = map.get(gl)

    if (thisTexture === undefined) {
        thisTexture = gl.createTexture()
        map.set(gl, thisTexture);
        gl.activeTexture(gl.TEXTURE0);
    }

    gl.bindTexture(gl.TEXTURE_2D, thisTexture);
    // 确保即使不是 2 的整数次幂也能渲染
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);

    const aPosition2 = gl.getAttribLocation(currentProgram, "a_Position");
    const aTexCoord = gl.getAttribLocation(currentProgram, "a_Texcoord");
    gl.vertexAttribPointer(aPosition2, 2, gl.FLOAT, false, SIZE * 4, 0);
    gl.enableVertexAttribArray(aPosition2);
    gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, SIZE * 4, SIZE * 2);
    gl.enableVertexAttribArray(aTexCoord);
    // to be improved
    for (let m = 0; m < n; m++) {
        gl.drawArrays(gl.TRIANGLE_FAN, m * 4, 4)
    }
    // drawObject(gl.TRIANGLE_FAN, 0, 4);
    gl.bindTexture(gl.TEXTURE_2D, null);
}