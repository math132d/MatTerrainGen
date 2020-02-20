import * as ASSETS from './utils/AssetManager';

import MainScene from './MainScene';
import Renderer from './Renderer';

const CANVAS = document.getElementById("canvas");

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

window.onresize = resize;