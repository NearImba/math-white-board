/**
 *
 * 产生一个program
 * @param {WebGLRenderingContext} gl
 * @param {WebGLShader} vertexShader
 * @param {WebGLShader} fragmentShader
 * @returns {WebGLProgram}
 */
export const createWebGLProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram => {
    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    const linkedStatus = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (linkedStatus) {
        return program;
    } else {
        console.error(gl.getProgramInfoLog(program));
        return null;
    }
}

/**
 * 创建Shader
 *
 * @param {WebGLRenderingContext} gl
 * @param {GLenum} type
 * @param {string} source
 * @returns {WebGLShader}
 */
function createShader(gl: WebGLRenderingContext, type: GLenum, source: string): WebGLShader {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);

    gl.compileShader(shader);

    const compiledStatus = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (compiledStatus) {
        return shader;
    } else {
        console.error(gl.getShaderInfoLog(shader));
        return null;
    }
}


/**
 * 创建顶点shader
 *
 * @param {WebGLRenderingContext} gl
 * @param {string} source
 * @returns
 */
export const createVertexShader = function (gl: WebGLRenderingContext, source: string): WebGLShader {
    return createShader(gl, gl.VERTEX_SHADER, source)
}


/**
 * 创建图元shader
 *
 * @param {WebGLRenderingContext} gl
 * @param {string} source
 * @returns
 */
export const createFragmentShader = function (gl: WebGLRenderingContext, source: string): WebGLShader {
    return createShader(gl, gl.FRAGMENT_SHADER, source)
}

export const tags = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

/**
 * 返回图元标示文字
 *
 * @export
 * @returns
 */
export function computePointTag(tagIndex: number): string {
    tagIndex += 1;
    if (tagIndex < tags.length) {
        return tags[tagIndex];
    } else {
        return tags[tagIndex % tags.length] + (tagIndex + 1 - tags.length).toString();
    }
};

/**
 * 获取顶点文字标示 在 文字贴图上的坐标
 *
 * @param {*} str
 * @returns
 */
export function getTextTexturePosition(str: string): Vec2 {
    const x = tags.indexOf(str.charAt(0)) > -1 ? tags.indexOf(str.charAt(0)) : 0;

    const y1 = parseInt(str.slice(1), 10);

    const y = Number.isNaN(y1) ? 0 : y1 % 100;
    return {
        x: x / tags.length,
        y: 0.99 - y / 100,
    };
}

export const ww = 56
export const hh = 34

/**
 * 将字符串中的整型数，加上浮点
 *
 * @export
 * @param {string} [func='']
 * @returns
 */
export function transformIntToFloatInString (func:string = '') {
    // func 整形转浮点
    const reg = /(\d+)(\.?)(\d*)/g;
    const tfunc = func.replace(reg, (s) => {
        if (s.indexOf('.') === -1) {
            return `${s}.0`;
        } else {
            return s;
        }
    });
    return tfunc;
};
