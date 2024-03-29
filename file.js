const fs = require('fs');
const file = {
    title: '二次函数的轴对称函数',
    translate: { x: 0, y: 0 },
    version: '1.0.0',
    elements: [{
        type: "Equal",
        data: "y = a * x * x + b * x + c",
    }, {
        type: "Equal",
        data: "-y = a * x * x - b * x + c",
    }, {
        type: "Stepper",
        data: {
            min: -5,
            max: 5,
            value: 1,
            step: 0.5,
            name: "a",
            left: "8px",
        },
    },
    {
        type: "Stepper",
        data: {
            min: -5,
            max: 5,
            value: 1,
            step: 0.2,
            name: "b",
            top: '43px',
            left: "8px",
        },
    },
    {
        type: "Stepper",
        data: {
            min: -5,
            max: 5,
            value: 1,
            step: 0.2,
            name: "c",
            top: '86px',
            left: "8px",
        },
    }, {
        type: "Latex",
        data: {
            text: "y = \\text{a} x^2 + \\text{b} x + c",
            top: '10px',
            left: "608px",
        },
    }, {
        type: "Latex",
        data: {
            text: "y = -\\text{a} x^2 + \\text{b} x - c",
            top: '38px',
            left: "608px",
        },
    }],
};

function encode(str) {
    return (Buffer.from(encodeURIComponent(str))).toString('base64');
}

fs.writeFile('./dist/courseware-1.txt', encode(JSON.stringify(file)), 'utf-8', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.info('教具资源生成成功');
});
