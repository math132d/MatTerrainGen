import * as THREE from 'three'; //Used in other modules

function Renderer(CANVAS, WIDTH, HEIGHT) {
    this.renderer = new THREE.WebGLRenderer( {canvas: CANVAS, antialias: true} );
    this.renderer.setSize(WIDTH, HEIGHT);

    return this.renderer;
}

export { Renderer as default};