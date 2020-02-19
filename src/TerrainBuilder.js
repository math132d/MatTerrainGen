import * as THREE from 'three';
import * as AM from './utils/AssetManager';

function TerrainBuilder(detail, heightmap) {

    this.geometry = new THREE.PlaneBufferGeometry(1, 1, detail, detail);

    this.shader = new THREE.ShaderMaterial( {
        vertexShader: AM.ASSETS["vertexShader"],
        fragmentShader: AM.ASSETS["fragmentShader"],

        side: THREE.DoubleSide,

        uniforms: {
            scale: {
                value: 0.5
            },
            heightmap: {
                type: "t",
                value: heightmap
            },
        }
    });
}

TerrainBuilder.prototype.build = function() {
    return new THREE.Mesh( this.geometry, this.shader );
}

export { TerrainBuilder as default }