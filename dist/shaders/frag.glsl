uniform sampler2D heightmap;

varying vec2 vUv;
varying float angle_to_light;

void main() {
    vec3 col = vec3(1.0, 1.0, 1.0) * vec3(1.0, 0.0, 0.0) * max(0.0, angle_to_light);

    gl_FragColor = vec4(col, 1.0);
}