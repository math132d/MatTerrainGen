uniform mat4 inverseModelMatrix;

uniform sampler2D heightmap;
uniform float scale;

varying vec3 vNormal;
varying vec2 vUv;

varying float vSlope;

vec3 calcNormal(vec2 uv, float texelSize) {

    vec4 h;
    h.r = texture2D(heightmap, uv + texelSize*vec2( 0.0, -1.0)).r;
    h.g = texture2D(heightmap, uv + texelSize*vec2(-1.0,  0.0)).r;
    h.b = texture2D(heightmap, uv + texelSize*vec2( 1.0,  0.0)).r;
    h.a = texture2D(heightmap, uv + texelSize*vec2( 0.0,  1.0)).r;

    vec3 normal;
    normal.z = h.r - h.a;
    normal.x = h.g - h.b;
    normal.y = (1.0 / (255.0 * scale));

    return normalize(normal);
}

void main() {
    float texelSize = 1.0 / 512.0;

    vUv = uv;
    vNormal = calcNormal(vUv, texelSize);

    vSlope = abs(dot(vec3(vNormal.zx, 0.0), vNormal));

    vec3 pos_local = position + (normal * texture2D(heightmap, uv).r) * scale;
    vec3 pos_view = (modelViewMatrix * vec4(pos_local.xyz, 1.0)).xyz;

    gl_Position = projectionMatrix * vec4(pos_view, 1.0);
}