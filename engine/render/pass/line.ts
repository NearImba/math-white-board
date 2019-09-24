const SIZE = Float32Array.BYTES_PER_ELEMENT;

export default function renderLines(gl: WebGLRenderingContext, currentProgram: WebGLProgram, count: number) {
    const aPosition = gl.getAttribLocation(currentProgram, "a_Position");
    const aSelected = gl.getAttribLocation(currentProgram, "a_Selected");
    const aSpecifiedColor = gl.getAttribLocation(currentProgram, 'a_SpecifiedColor')
    gl.vertexAttribPointer(aPosition, 4, gl.FLOAT, false, SIZE * 9, 0);
    gl.vertexAttribPointer(aSpecifiedColor, 4, gl.FLOAT, false, SIZE * 9, SIZE * 4);
    gl.vertexAttribPointer(aSelected, 1, gl.FLOAT, false, SIZE * 9, SIZE * 8);
    gl.enableVertexAttribArray(aPosition);
    gl.enableVertexAttribArray(aSelected);
    gl.enableVertexAttribArray(aSpecifiedColor);
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_BYTE, 0);
}
