$fsheader

// to be improved
uniform vec2 u_Resolution;
uniform vec2 u_Translate;
uniform vec3 u_Config;
varying vec4 v_Position;

vec4 bgColor = vec4(1.0, 1.0, 1.0, 1.0);

vec4 crossColor = vec4(1.0, 0.0, 0.0, 0.0);

// draw the cross
float cross (vec2 p, float w) {
    float u_XStep = u_Config.x;
    float u_YStep = u_Config.y;
    float u_XMax = u_Config.z;
    float f = step(0.0 - w / 2.0, p.x) * step(p.x, 0.0 + w / 2.0) + step(0.0 - w / 2.0, p.y) * step(p.y, 0.0 + w / 2.0);
    return f;
}

// draw the smallblock
float block (vec2 p, float w) {
    float f = step(w, p.x) * step(p.x, 1.0 - w) * step(w, p.y) * step(p.y, 1.0 - w);
    if(f > 0.0) {
        return 0.0;
    } else {
        return 1.0;
    }
}

float sinLine(vec2 p, float w) {
    return 1.0;
}

bool blocks(vec2 p2, float w) {
    float u_XStep = u_Config.x;
    float u_YStep = u_Config.y;
    float u_XMax = u_Config.z;
    float xs = w / u_XStep;
    float ys = w / u_YStep;
    vec2 p3 = fract(vec2(p2.x * .5 *u_XMax / u_XStep, p2.y * .5 * u_XMax / u_YStep));
    vec2 p4 = abs(p3 - 0.5);
    if(p4.x < xs || p4.x + xs > 0.5 || p4.y < ys || p4.y + ys > 0.5) {
        return true;
    }
    return false;
}

bool coordinateSign(vec2 p, float h) {
    float u_XStep = u_Config.x;
    float u_YStep = u_Config.y;
    float u_XMax = u_Config.z;
    vec2 p1 = p * u_XMax;
    float chx = 0.1;
    if(abs(p1.x) > chx && abs(p1.y) > chx) {
        return false;
    }

    float y1 = abs(smoothstep(0.0, u_YStep, abs(mod(p1.y, u_YStep))) - 0.5);
    if(abs(p1.x) < chx && y1 + h / u_YStep > 0.5) {
        return true;
    }

    float x1 = abs(smoothstep(0.0, u_XStep, abs(mod(p1.x, u_XStep))) - 0.5);
    if(abs(p1.y) < chx && x1 + h / u_XStep > 0.5) {
        return true;
    }

    return false;
}

void main() {
    vec2 posi = vec2(v_Position) - u_Translate;
    vec2 p2 = vec2(posi.x, posi.y * u_Resolution.y / u_Resolution.x);
    float u_XStep = u_Config.x;
    float u_YStep = u_Config.y;
    float u_XMax = u_Config.z;

    float minWidth = u_XMax / max(u_Resolution.x, u_Resolution.y);

    if(blocks(p2, 0.008)) {
        gl_FragColor = vec4(1.0, 0.0, 1.0, .6);
    }

    if(cross(vec2(p2.x, p2.y), 0.006) > 0.0) {
        gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);    
    }

    if(coordinateSign(p2, 0.002)) {
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }
}