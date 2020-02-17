import * as THREE from 'three'

const CANVAS = document.getElementById("canvas");

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let camera;
let scene;
let renderer;

let mesh;

const init = () => {
    camera = new THREE.PerspectiveCamera(70, WIDTH/HEIGHT, 0.01, 10);
    camera.position.z = 1;

    scene = new THREE.Scene();

    let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    let material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh( geometry, material );
    scene.add(mesh)

    renderer = new THREE.WebGLRenderer( {canvas: CANVAS, antialias: true} );
    renderer.setSize(WIDTH, HEIGHT);

    requestAnimationFrame(draw);
}

const draw = () => {
    renderer.render(scene, camera);

    requestAnimationFrame(draw);
}

const resize = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
    renderer.setSize(WIDTH, HEIGHT);
}

window.onload = init;
window.onresize = resize;