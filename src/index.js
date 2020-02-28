import * as ASSETS from './utils/AssetManager';

import MainScene from './MainScene';
import Renderer from './Renderer';

import { noise_to_canvas } from 'wasm';

const SETTINGS = document.getElementById("window");
const CLOSE_SETTINGS = document.getElementById("close_settings");
const OPEN_SETTINGS = document.getElementById("open_settings");
const CANVAS = document.getElementById("canvas");
const HEIGHTMAP = document.getElementById("heightmap");
const HEIGHTMAP_CTX = HEIGHTMAP.getContext("2d");

const in_water = document.getElementById("tr_water");
const in_range = document.getElementById("tr_height");
const in_gen = document.getElementById("gen_hm");

CLOSE_SETTINGS.addEventListener("click", () => {
    toggle_settings();
})

OPEN_SETTINGS.addEventListener("click", () => {
    toggle_settings();
})

in_gen.addEventListener("click", () => {
    update_map();
})

in_range.addEventListener("input", () => {
    let value = in_range.value / 1000;
    mainscene.terrainBuilder.get_mesh().material.uniforms.scale.value = value;
})

in_water-addEventListener("input", () => {
    let value = in_water.value / 1000;
    mainscene.water.position.y = value;
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

    mainscene = new MainScene(renderer);
    mainscene.init();

    update_map();

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

const update_map = () => {
    const size = document.getElementById("hm_size").value;
    const freq = document.getElementById("hm_freq").value;
    const oct = document.getElementById("hm_oct").value;

    const w = size;
    const h = size;

    console.log(`${w}, ${h}`);

    let pixel_view = new Uint8ClampedArray(w * h * 4);
    noise_to_canvas(w, h, freq, oct, pixel_view);
    let imageData = new ImageData(pixel_view, w, h);
    HEIGHTMAP_CTX.putImageData(imageData, 0, 0);

    mainscene.terrainBuilder.update_texture();
}

const toggle_settings = () => {
    if( SETTINGS.hasAttribute("closed") ){
        SETTINGS.removeAttribute("closed");
    }else{
        SETTINGS.setAttribute("closed", "true");
    }
}

window.onresize = resize;