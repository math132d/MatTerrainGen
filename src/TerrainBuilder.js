import * as THREE from 'three';
import * as AM from './utils/AssetManager';

function TerrainBuilder(detail, heightmap) {

    this.geometry = new THREE.PlaneBufferGeometry(1, 1, detail, detail);

    this.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    this.scale = 0.5;

    this.shader = new THREE.ShaderMaterial( {
        vertexShader: AM.ASSETS["vertexShader"],
        fragmentShader: AM.ASSETS["fragmentShader"],

        side: THREE.DoubleSide,

        uniforms: {
            scale: {
                value: this.scale
            },
            heightmap: {
                type: "t",
                value: heightmap
            },
            flatmap: {
                type: "t",
                value: AM.ASSETS["grass"]
            },
            edgemap: {
                type: "t",
                value: AM.ASSETS["rock"]
            }
        }
    });

    this.mesh = new THREE.Mesh( this.geometry, this.shader );
}

TerrainBuilder.prototype.get_mesh = function() {
    return this.mesh;
}

export { TerrainBuilder as default }