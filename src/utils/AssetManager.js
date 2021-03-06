import * as THREE from 'three';

let ASSETS = {};

let start_loading = async function( onfinish ){
    let textureLoader = new THREE.TextureLoader();

    this.ASSETS["vertexShader"] = await ( await fetch('shaders/vert.glsl')).text();
    this.ASSETS["fragmentShader"] = await ( await fetch('shaders/frag.glsl')).text();
    this.ASSETS["sand"] = await load_texture(textureLoader, 'assets/sand.jpg');
    this.ASSETS["grass"] = await load_texture(textureLoader, 'assets/grass_3.jpg');
    this.ASSETS["rock"] = await load_texture(textureLoader, 'assets/cliffs.jpg');

    this.ASSETS["water_normal_01"] = await load_texture(textureLoader, 'assets/Water_1_M_Normal.jpg');
    this.ASSETS["water_normal_02"] = await load_texture(textureLoader, 'assets/Water_2_M_Normal.jpg');

    this.ASSETS["sand"].wrapS = THREE.RepeatWrapping;
    this.ASSETS["sand"].wrapT = THREE.RepeatWrapping;

    this.ASSETS["grass"].wrapS = THREE.RepeatWrapping;
    this.ASSETS["grass"].wrapT = THREE.RepeatWrapping;

    this.ASSETS["rock"].wrapS = THREE.RepeatWrapping;
    this.ASSETS["rock"].wrapT = THREE.RepeatWrapping;

    onfinish();
};

let load_texture = function(textureLoader, asset) {
    return new Promise((resolve, reject) => {
        textureLoader.load(asset,
            (texture) => { //On load
                resolve(texture);
            },
            (total, loaded) => {
                console.log(`Loading: ${(loaded/total) * 100}%`);
            },
            (err) => { //On error
                reject(`Failed to load ${asset}`);
            }
        );
    });
};

export {ASSETS, start_loading};