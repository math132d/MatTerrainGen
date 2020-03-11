#define PI 3.1415926535897932384626433832795

uniform mat4 inverseModelMatrix;

uniform sampler2D heightmap;
uniform float scale;
uniform float transition;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

varying float vSlope;

vec2 bezier3(float t, vec2 one, vec2 two, vec2 three) {
    return ((1.0 - t)*((1.0-t)*one + t*two) + t*((1.0-t)*two + t*three));
}

vec2 bezier4(float t, vec2 one, vec2 two, vec2 three, vec2 four) {
    return (1.0-t)*bezier3(t, one, two, three) + t*bezier3(t, two, three, four);
}

float slopeScale(vec2 uv) {
    float dist = length(vec2(0.5, 0.5) - uv) * 2.0;
    vec2 P0 = vec2(0.0, 1.0);
    vec2 P1 = vec2(0.99, 1.0);
    vec2 P2 = vec2(1.0, 1.0);
    vec2 P3 = vec2(1.0, 0.0);

    return clamp(bezier4(dist, P0, P1, P2, P3).y, 0.01, 1.0);
}

float transitionScale(){
    return 1.0 - sin(scale * PI);
}

vec3 calcNormal(vec2 uv, float texelSize) {

    vec4 h;
    h.r = texture2D(heightmap, uv + texelSize*vec2( 0.0, -1.0)).r;
    h.g = texture2D(heightmap, uv + texelSize*vec2(-1.0,  0.0)).r;
    h.b = texture2D(heightmap, uv + texelSize*vec2( 1.0,  0.0)).r;
    h.a = texture2D(heightmap, uv + texelSize*vec2( 0.0,  1.0)).r;

    vec3 normal;
    normal.z = h.r - h.a;
    normal.x = h.g - h.b;
    normal.y = (1.0 / (255.0 * scale * slopeScale(uv)));

    return normalize(normal);
}

void main() {
    float texelSize = 1.0 / 512.0;

    vUv = uv;
    vNormal = calcNormal(vUv, texelSize);

    vSlope = abs(dot(vec3(1.0, 0.0, 0.0), vNormal));

    vec3 pos_local = position + (normal * texture2D(heightmap, uv).r) * scale * slopeScale(uv);
    vPosition = pos_local;
    vec3 pos_view = (modelViewMatrix * vec4(pos_local.xyz, 1.0)).xyz;

    gl_Position = projectionMatrix * vec4(pos_view, 1.0);
}