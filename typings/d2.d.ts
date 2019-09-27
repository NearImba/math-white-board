// 视口坐标 -1 ~ 1
declare interface Vec2 {
    x: number;
    y: number;
}

declare interface Vec3 {
    x: number;
    y: number;
    z: number;
}

declare interface Vec4 {
    x: number;
    y: number;
    z: number;
    a: number;
}

// 颜色
declare interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

declare const SIZE: number;

declare enum Types {
    Point = 'Point', // 点
    Polygon = 'Polygon', // 多边形
    Line = 'Line', // 线段
    Ray = 'Ray', // 射线
    Equal = 'Equal', // 方程
    Stepper = 'Stepper', // 步进器
    Angle = 'Angle', // 角度
    Straight = 'Straight', // 直线
    Coordinate = 'Coordinate' // 笛卡尔坐标系
}

declare module "*.vs" {
    const content: any;
    export default content;
}

declare module "*.fs" {
    const content: any;
    export default content;
}

declare module "*.svg" {
    const content: any;
    export default content;
}

declare module "*.less";

declare enum MathStageEventType {
    Translate = 'TRANSLATE', // 整个视图移动
    Scale = 'SCALE', // 整个视图缩放
    Uniform = 'UNIFORM', // 全局参数变化
    PtMove = 'PTMOVE', // 顶点以及相应object发生变化
    Fullscreen = 'FULLSCREEN', // 全屏
}

declare interface MathStageEvent {
    type: MathStageEventType,
    data: any,
}

declare interface MathStage {
    onReceiveEvent: Function,
}