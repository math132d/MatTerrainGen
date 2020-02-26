uniform sampler2D heightmap;
uniform float scale;

varying vec2 vUv;
varying float slope;
varying float angle_to_light;

vec3 calcNormal(vec2 uv, float texelSize) {

    vec4 h;
    h.r = texture2D(heightmap, uv + texelSize*vec2( 0.0, -1.0)).r;
    h.g = texture2D(heightmap, uv + texelSize*vec2(-1.0,  0.0)).r;
    h.b = texture2D(heightmap, uv + texelSize*vec2( 1.0,  0.0)).r;
    h.a = texture2D(heightmap, uv + texelSize*vec2( 0.0,  1.0)).r;

    vec3 normal;
    normal.z = h.r - h.a;
    normal.x = h.g - h.b;
    normal.y = 0.03;

    return normalize(normal);
}

void main() {
    vUv = uv;

    float texelSize = 1.0 / 512.0;

    vec3 normal_view = calcNormal(vUv, texelSize);
    vec3 light_dir = vec3(0.0, 0.3, 1.0);

    slope = abs(dot(vec3(normal_view.zx, 0.0), normal_view));
    angle_to_light = dot(normal_view, light_dir);

    vec3 pos_local = position + (normal * texture2D(heightmap, uv).r) * scale;

    vec3 pos_view = (modelViewMatrix * vec4(pos_local.xyz, 1.0)).xyz;

    gl_Position = projectionMatrix * vec4(pos_view, 1.0);
}