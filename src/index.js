import * as ASSETS from './utils/AssetManager';

import MainScene from './MainScene';
import Renderer from './Renderer';

import { noise_to_canvas } from 'wasm';

const CANVAS = document.getElementById("canvas");
const HEIGHTMAP = document.getElementById("heightmap");
const HEIGHTMAP_CTX = HEIGHTMAP.getContext("2d");

const in_range = document.getElementById("range");
const in_gen = document.getElementById("gen_hm");

in_gen.addEventListener("click", () => {
    update_map(6, 4);
    mainscene.terrainBuilder.update_texture();
})

in_range.addEventListener("input", () => {
    let value = in_range.value / 100;
    mainscene.terrainBuilder.get_mesh().material.uniforms.scale.value = value;
})

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let prevFrame;

let mainscene;
let renderer;

ASSETS.start_loading( () => {
    console.log("Finished loading resources!");
    init()
});

const init = function() {
    renderer = new Renderer(CANVAS, WIDTH, HEIGHT);

    update_map(6, 4);

    mainscene = new MainScene(renderer);
    mainscene.init();

    prevFrame = Date.now();

    requestAnimationFrame(draw);
}

const draw = () => {
    let now = Date.now();
    let delta = (now - prevFrame) / 1000;
    prevFrame = now;
    
    mainscene.draw(delta);

    requestAnimationFrame(draw);
}

const resize = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    renderer.setSize(WIDTH, HEIGHT);
    mainscene.resize();
}

const update_map = (freq, oct) => {
    const w = 512;
    const h = 512;

    console.log(`${w}, ${h}`);   

    let pixel_view = new Uint8ClampedArray(w * h * 4);
    noise_to_canvas(w, h, freq, oct, pixel_view);
    let imageData = new ImageData(pixel_view, w, h);
    HEIGHTMAP_CTX.putImageData(imageData, 0, 0);
}

window.onresize = resize;