uniform sampler2D flatmap;
uniform sampler2D sand;
uniform sampler2D edgemap;

uniform vec3 worldLightPos;
uniform vec3 lightCol;

uniform float waterlevel;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

varying float vSlope;

float minSlope = 0.6;
float maxSlope = 1.0;

float tile = 20.0;

void main() {
    float slope = clamp((vSlope - minSlope) * (1.0 / (maxSlope-minSlope)), 0.0, 1.0);

    float sand_mask = clamp(1.0 - ((vPosition.y - waterlevel) * (1.0 / 0.02)), 0.0, 1.0);

    vec3 surface = mix(texture2D(flatmap, vUv*tile).rgb, texture2D(edgemap, vPosition.zy*tile).rgb, slope);
    vec3 color = mix(surface, texture2D(sand, vUv*tile).rgb, sand_mask);


    float att = clamp((vPosition.y) * (1.0 / (waterlevel)), 0.0, 1.0);

    vec3 ambient = color * vec3(0.25, 0.25, 0.35);
    vec3 diffuse = color * lightCol * max(0.0, dot(normalize(vNormal), worldLightPos));

    //gl_FragColor = vec4(ambient+diffuse, 1.0);

    vec3 ocean_floor = vec3(0.0, 0.1, 0.2) * (1.0-att);

    //gl_FragColor = vec4(col, col, col, 1.0);
    gl_FragColor = vec4(ocean_floor + att * (diffuse+ambient), 1.0);
}