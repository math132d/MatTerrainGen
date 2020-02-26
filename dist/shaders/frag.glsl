uniform sampler2D heightmap;
uniform sampler2D flatmap;
uniform sampler2D edgemap;

uniform vec3 worldLightPos;
uniform vec3 lightCol;

varying vec3 vNormal;
varying vec2 vUv;

varying float vSlope;

void main() {
    vec3 color = mix(texture2D(flatmap, vUv*10.0).rgb, texture2D(edgemap, vUv*10.0).rgb, vSlope);

    vec3 ambient = color * vec3(0.3, 0.4, 0.45);
    vec3 diffuse = color * lightCol * max(0.0, dot(normalize(vNormal), worldLightPos));

    gl_FragColor = vec4(ambient+diffuse, 1.0);
    //gl_FragColor = vec4(vNormal, 1.0);
}