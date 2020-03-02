import * as THREE from 'three';
import * as AM from './utils/AssetManager';

const HEIGHTMAP = document.getElementById("heightmap");

function TerrainBuilder(detail) {
    this.scale = 0.5; //Terrain height

    this.detail = detail;

    this.geometry = new THREE.PlaneBufferGeometry(1, 1, detail, detail);

    this.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    this.shader = new THREE.ShaderMaterial( {
        vertexShader: AM.ASSETS["vertexShader"],
        fragmentShader: AM.ASSETS["fragmentShader"],

        side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh( this.geometry, this.shader );

    this.uniforms = {
        worldLightPos: {
            value: new THREE.Vector3(1.0, 1.0, 0).normalize()
        },
        lightCol: {
            value: new THREE.Color(1.0, 1.0, 0.9)
        },
        scale: {
            value: this.scale
        },
        heightmap: {
            type: "t",
            value: undefined,
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

    this.mesh.material.uniforms = this.uniforms;
}

TerrainBuilder.prototype.get_mesh = function() {
    return this.mesh;
}

TerrainBuilder.prototype.update_texture = function() {
    this.mesh.material.uniforms.heightmap.value = new THREE.CanvasTexture(HEIGHTMAP);
}

TerrainBuilder.prototype.update = function (detail) {
    if (detail != this.detail){
        console.log(`new resolution: ${detail}`);
        this.detail = detail;
        this.geometry = new THREE.PlaneBufferGeometry(1, 1, detail, detail);
    }
    this.update_texture();
}

export { TerrainBuilder as default }