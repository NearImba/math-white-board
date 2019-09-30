import pointVs from './shader/point.vs'
import pointFs from './shader/point.fs'

import pTextVs from './shader/pText.vs'
import pTextFs from './shader/pText.fs'

import coordinateVs from './shader/coordinate.vs'
import coordinateFs from './shader/coordinate.fs'
import coordinateFs1 from './shader/coordinate1.fs'

import lineVs from './shader/line.vs';
import lineFs from './shader/line.fs';

import polygonVs from './shader/polygon.vs'
import polygonFs from './shader/polygon.fs'

import { createWebGLProgram, createVertexShader, createFragmentShader } from './utils'

import Store from '../store/index'

/**
 * 初始化program
 *
 * @export
 */
export function initializePrograms(gl: WebGLRenderingContext, map: Map<string, WebGLProgram>) {
    // point 
    const vs1 = createVertexShader(gl, pointVs)
    const fs1 = createFragmentShader(gl, pointFs)
    const p1 = createWebGLProgram(gl, vs1, fs1)
    map.set('point', p1)

    const vs2 = createVertexShader(gl, pTextVs)
    const fs2 = createFragmentShader(gl, pTextFs)
    const p2 = createWebGLProgram(gl, vs2, fs2)
    map.set('ptext', p2)

    const vs3 = createVertexShader(gl, coordinateVs)
    const fs3 = createFragmentShader(gl, coordinateFs1)
    const p3 = createWebGLProgram(gl, vs3, fs3)
    map.set('coordinate', p3)

    const vs4 = createVertexShader(gl, lineVs)
    const fs4 = createFragmentShader(gl, lineFs)
    const p4 = createWebGLProgram(gl, vs4, fs4)
    map.set('line', p4)

    const vs5 = createVertexShader(gl, polygonVs)
    const fs5 = createFragmentShader(gl, polygonFs)
    const p5 = createWebGLProgram(gl, vs5, fs5)
    map.set('polygon', p5)
}

// 之所以没有用 unifroms buffer object 优化 是因为webgl2浏览器支持型很差
export function setGlobalUniforms(gl: WebGLRenderingContext, program: WebGLProgram, store: Store, isPicking: boolean) {
    const resolution = gl.getUniformLocation(program, "u_Resolution");
    const xMax = gl.getUniformLocation(program, 'u_XMax');
    // const time = gl.getUniformLocation(program, "u_Time");
    const nColor = gl.getUniformLocation(program, 'u_Color');
    const selectedColor = gl.getUniformLocation(program, "u_SelectedColor");

    const uPicking = gl.getUniformLocation(program, "u_Picking");
    const uTranslate = gl.getUniformLocation(program, 'u_Translate');

    const size = store.getSize()
    gl.uniform2f(resolution, size.width, size.height);

    const translate = store.getTranslate();
    gl.uniform2f(uTranslate, translate.x / store.X, translate.y / (store.X * store.AS));

    gl.uniform1f(xMax, store.X + 0.001);

    gl.uniform1i(uPicking, isPicking ? 1 : 0);

    gl.uniform3f(nColor, 1.0, 0.0, 0.0); // 正常为红色
    gl.uniform3f(selectedColor, 0.0, 0.0, 1.0); // 选中为蓝色
}