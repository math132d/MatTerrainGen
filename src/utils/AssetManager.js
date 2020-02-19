import * as THREE from 'three';

let ASSETS = {};

let start_loading = async function( onfinish ){
    let textureLoader = new THREE.TextureLoader();

    this.ASSETS["vertexShader"] = await ( await fetch('shaders/vert.glsl')).text();
    this.ASSETS["fragmentShader"] = await ( await fetch('shaders/frag.glsl')).text();
    this.ASSETS["heightmap"] = textureLoader.load('assets/heightmap.png', () => {
        onfinish();
    });

    //onfinish();
};

export {ASSETS, start_loading};