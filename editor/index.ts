import MathRender from '../engine/index'

const editor = new MathRender({
    Canvas: document.querySelector('#math'),
    iWidth: 1200,
    iHeight: 600,
})

editor.clear()

// const r = MathRender.loadData('[{"type":"Point","data":{"xy":{"x": 0, "y": 0}}}, {"type":"Point","data":{"xy":{"x": 0.3, "y": 0.5}}},{"type": "Equal", "data": "y = tan(x)"},{"type": "Equal", "data": "y = sin(x)"}]')

const r = MathRender.loadData('[{"type": "Equal", "data": "y * y / 4 + x * x /9  = 1"}]')

function r1() {
    editor.render(r, false)
    requestAnimationFrame(r1)
}

// r1()
editor.render(r, false)


const editor2 = new MathRender({
    Canvas: document.querySelector('#math2')
})

editor2.clear()

const r2 = MathRender.loadData('[{"type":"Point","data":{"xy":{"x": 0, "y": 0}}}, {"type":"Point","data":{"xy":{"x": 0.1, "y": 0.4}}}, {"type":"Line","data":{"p1":{"x": 0.5, "y": 0},  "tag1": "B22", "p2":{"x": -0.3, "y": -0.3},"tag2": "C4"}}, {"type":"Line","data":{"p1":{"x": -0.5, "y": 0},  "tag1": "B3", "p2":{"x": -0.3, "y": 0.3},"tag2": "C6"}}, {"type": "Polygon", "data": [{"x": -0.3, "y": -0.2}, {"x": 0.2, "y": 0.3}, {"x": 0.6, "y": -0.5 }]}]')

editor2.render(r2, false)