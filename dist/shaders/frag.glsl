uniform sampler2D heightmap;
uniform sampler2D flatmap;
uniform sampler2D edgemap;

varying vec2 vUv;
varying float slope;
varying float angle_to_light;

void main() {
    float slope_tex = mix(0.0, 4.5, slope);

    vec3 diffuse = mix(texture2D(flatmap, vUv*10.0).rgb, texture2D(edgemap, vUv*10.0).rgb, slope_tex);

    vec3 col = vec3(0.05, 0.06, 0.1) + diffuse * vec3(1.0, 0.968, 0.721) * max(0.0, angle_to_light);

    gl_FragColor = vec4(col, 1.0);
    //gl_FragColor = vec4(slope, 0.0, 0.0, 1.0);
}