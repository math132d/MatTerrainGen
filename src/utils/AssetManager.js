import * as THREE from 'three';

let ASSETS = {};

let start_loading = async function( onfinish ){
    let textureLoader = new THREE.TextureLoader();

    this.ASSETS["vertexShader"] = await ( await fetch('shaders/vert.glsl')).text();
    this.ASSETS["fragmentShader"] = await ( await fetch('shaders/frag.glsl')).text();
    this.ASSETS["heightmap"] = textureLoader.load('assets/heightmap.png');

    this.ASSETS["grass"] = textureLoader.load('assets/grass.jpg', ()  => {
        this.ASSETS["grass"].wrapS = THREE.RepeatWrapping;
        this.ASSETS["grass"].wrapT = THREE.RepeatWrapping;
    })

    this.ASSETS["rock"] = textureLoader.load('assets/rock.jpg', ()  => {
        this.ASSETS["rock"].wrapS = THREE.RepeatWrapping;
        this.ASSETS["rock"].wrapT = THREE.RepeatWrapping;
        onfinish();
    })


    //onfinish();
};

export {ASSETS, start_loading};