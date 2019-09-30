/**
* 种类
*
* @enum {number}
*/
enum Types {
    Point = 'Point', // 点
    Polygon = 'Polygon', // 多边形
    Line = 'Line', // 线段
    Ray = 'Ray', // 射线
    Equal = 'Equal', // 方程
    Stepper = 'Stepper', // 步进器
    Angle = 'Angle', // 角度
    Straight = 'Straight', // 直线
    Coordinate = 'Coordinate', // 笛卡尔坐标系
    Latex = 'Latex',
}

export enum MathStageEventType {
    Translate = 'TRANSLATE', // 整个视图移动
    Scale = 'SCALE', // 整个视图缩放
    Uniform = 'UNIFORM', // 全局参数变化
    PtMove = 'PTMOVE', // 顶点以及相应object发生变化
    Fullscreen = 'FULLSCREEN', // 全屏
}

export default Types;