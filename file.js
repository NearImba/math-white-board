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
            min: -3,
            max: 3,
            value: 0.5,
            step: 1,
            name: "a",
            left: "8px",
        },
    },
    {
        type: "Stepper",
        data: {
            min: -2,
            max: 3,
            value: 0.5,
            step: 0.2,
            name: "b",
            top: '40px',
            left: "8px",
        },
    },
    {
        type: "Stepper",
        data: {
            min: -3,
            max: 3,
            value: 0.5,
            step: 0.5,
            name: "c",
            top: '80px',
            left: "8px",
        },
    }],
};

function encode(str) {
    return (Buffer.from(encodeURIComponent(str))).toString('base64');
}

fs.writeFile('courseware-1.txt', encode(JSON.stringify(file)), 'utf-8', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.info('教具资源生成成功');
});
