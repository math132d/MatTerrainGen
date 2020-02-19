import * as THREE from 'three';
import * as AM from './utils/AssetManager';
import TerrainBuilder from './TerrainBuilder';

function MainScene (renderer) {

    let size = new THREE.Vector2(0,0);
    renderer.getSize(size);

    this.renderer = renderer;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
        70,
        size.x/size.y,
        0.01,
        10
    );
}

MainScene.prototype.init = function() {
    this.camera.position.set(0, 0.3, 1);

    let terrainBuilder = new TerrainBuilder(1000, AM.ASSETS["heightmap"]);
    this.terrain = terrainBuilder.build();
    this.terrain.rotateX(-Math.PI/2);

    let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    let material = new THREE.MeshNormalMaterial();

    this.box = new THREE.Mesh( geometry, material );

    this.scene.add(this.camera);
    this.scene.add(this.box);
    this.scene.add(this.terrain);
}

MainScene.prototype.draw = function(delta) {
    this.terrain.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.1*delta);
    this.renderer.render(this.scene, this.camera);
}

MainScene.prototype.resize = function() {
    let size = new THREE.Vector2(0,0);
    this.renderer.getSize(size);
    this.camera.aspect = size.x / size.y;
    this.camera.updateProjectionMatrix();
}

export { MainScene as default }