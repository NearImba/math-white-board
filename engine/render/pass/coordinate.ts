import Types from "../../base/types";
import Store from "../../store/index";
import { steps, renderSafeSpacing } from '../../config'

const SIZE = Float32Array.BYTES_PER_ELEMENT;
const lastSize = {
    width: 0,
    height: 0,
}
const cacheCanvasMap = new Map<WebGLRenderingContext, HTMLCanvasElement>()

const cache2DMap = new Map<WebGLRenderingContext, CanvasRenderingContext2D>()

const map2 = new Map<WebGLRenderingContext, WebGLTexture>()

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
            const step = steps[store.SI]
            const stepWidth = renderSafeSpacing[store.SI % 2]
            gl.uniform2f(resolution, size.width, size.height);
            gl.uniform3f(uConfig, stepWidth, store.AS, store.X);
            const translate = store.getTranslate();
            gl.uniform2f(uTranslate, translate.x / store.X, translate.y / (store.X * store.AS));
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
            // 画刻度 to be improved
            let cacheCanvas = cacheCanvasMap.get(gl)
            if(cacheCanvas === undefined) {
                cacheCanvas = document.createElement('canvas')
                cacheCanvasMap.set(gl, cacheCanvas)
                cache2DMap.set(gl, cacheCanvas.getContext('2d'))
            }

            if (size.height !== lastSize.height || size.width !== lastSize.width) {
                lastSize.width = size.width;
                lastSize.height = size.height;
                cacheCanvas.width = lastSize.width;
                cacheCanvas.height = lastSize.height;
                
            }

            const xMax = store.X;
            const xmax = xMax - translate.x
            const ymax = xMax * store.AS - translate.y;
            const xmin = - xMax - translate.x
            const ymin = - xMax * store.AS - translate.y;

            const sg = cache2DMap.get(gl)
            sg.clearRect(0,0, size.width, size.height)
            sg.textAlign = "left";
            sg.textBaseline = "top";
            sg.fillStyle = "black";
            sg.font = `16px Menlo`;
            const w = 3
            let py = size.height * 0.5 - (ymax - ymax % step + translate.y) / step * stepWidth;
            let px = size.width * 0.5 + (xmin - xmin % step + translate.x) / step * stepWidth;
            for (let x = xmin - xmin % step; x <= xmax; x += step) {
                sg.fillText(x.toString(), px + w, size.height * 0.5 - translate.y / step * stepWidth + w)
                px += stepWidth;
            }

            for (let y = ymax - ymax % step; y >= ymin; y -= step) {
                sg.fillText(y.toString(), size.width * 0.5 + translate.x / step * stepWidth + w, py + w)
                py += stepWidth;
            }

            let thisTexture = map2.get(gl)

            if (thisTexture === undefined) {
                thisTexture = gl.createTexture()
                map2.set(gl, thisTexture);
                gl.activeTexture(gl.TEXTURE0);
            }

            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

            const p1 = [-1, 1, 0, 0,
                -1, -1, 0, 1,
                1, -1, 1, 1,
                1, 1, 1, 0
            ]

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p1), gl.STATIC_DRAW);

            const currentProgram2 = map.get('ptext')
            gl.useProgram(currentProgram2)

            gl.bindTexture(gl.TEXTURE_2D, thisTexture);
            // 确保即使不是 2 的整数次幂也能渲染
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cacheCanvas);

            const aPosition = gl.getAttribLocation(currentProgram2, "a_Position");
            const aTexCoord = gl.getAttribLocation(currentProgram2, "a_Texcoord");
            gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, SIZE * 4, 0);
            gl.enableVertexAttribArray(aPosition);
            gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, SIZE * 4, SIZE * 2);
            gl.enableVertexAttribArray(aTexCoord);

            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
            gl.bindTexture(gl.TEXTURE_2D, null);

            break;
        default:
            break;
    }
}