const SIZE = Float32Array.BYTES_PER_ELEMENT;

export default function renderPoints(gl: WebGLRenderingContext, currentProgram: WebGLProgram, start: number, n: number) {
    const aPosition2 = gl.getAttribLocation(currentProgram, "a_Position");
    const aSelected2 = gl.getAttribLocation(currentProgram, "a_Selected");
    const aSpecifiedColor = gl.getAttribLocation(currentProgram, 'a_SpecifiedColor')
    gl.vertexAttribPointer(aPosition2, 2, gl.FLOAT, false, SIZE * 6, 0);
    gl.vertexAttribPointer(aSelected2, 1, gl.FLOAT, false, SIZE * 6, SIZE * 2);
    gl.vertexAttribPointer(aSpecifiedColor, 3, gl.FLOAT, false, SIZE * 6, SIZE * 3);
    gl.enableVertexAttribArray(aPosition2);
    gl.enableVertexAttribArray(aSelected2);
    gl.enableVertexAttribArray(aSpecifiedColor);
    gl.drawArrays(gl.POINTS, start, n);
}