import * as THREE from 'three';
import * as AM from './utils/AssetManager';
import { Water } from 'three/examples/jsm/objects/Water2.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TerrainBuilder from './TerrainBuilder';

function MainScene (renderer) {

    let size = new THREE.Vector2(0,0);
    renderer.getSize(size);
    renderer.setClearColor(new THREE.Color(1.0, 1.0, 1.0), 1.0);

    this.renderer = renderer;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x87CEEB, 1, 3);
    this.scene.background = new THREE.Color(0x87CEEB);
    this.camera = new THREE.PerspectiveCamera(
        70,
        size.x/size.y,
        0.01,
        10
    );

    this.control = new OrbitControls(this.camera, renderer.domElement);
}

MainScene.prototype.init = function() {
    this.camera.position.set(0, 0.3, 1);
    this.control.update();

    this.terrainBuilder = new TerrainBuilder(512);

    let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    let material = new THREE.MeshNormalMaterial();

    var planeGeomery = new THREE.PlaneBufferGeometry( 10, 10 );

    this.plane = new THREE.Mesh( planeGeomery, new THREE.MeshBasicMaterial( {color: "#013"} ) );

    var waterGeometry = new THREE.PlaneBufferGeometry( 10, 10 );

    var params = {
        color: '#00eeff',
        scale: 40,
        flowX: 1,
        flowY: 1
    };

    this.water = new Water( waterGeometry, {
        normalMap0: AM.ASSETS["water_normal_01"],
        normalMap1: AM.ASSETS["water_normal_02"],
        color: params.color,
        scale: params.scale,
        flowDirection: new THREE.Vector2( params.flowX, params.flowY ),
        textureWidth: 1024,
        textureHeight: 1024
    } );

    this.water.position.y = 0.25;
    this.water.rotation.x = Math.PI * - 0.5;
    this.plane.position.y = 0.003;
    this.plane.rotation.x = Math.PI * - 0.5;


    this.box = new THREE.Mesh( geometry, material );

    this.scene.add(this.camera);
    //this.scene.add(this.box);
    this.scene.add(this.water);
    this.scene.add(this.plane)
    this.scene.add(this.terrainBuilder.get_mesh());
}

MainScene.prototype.draw = function(delta) {
    this.control.update();
    this.renderer.render(this.scene, this.camera);
}

MainScene.prototype.resize = function() {
    let size = new THREE.Vector2(0,0);
    this.renderer.getSize(size);
    this.camera.aspect = size.x / size.y;
    this.camera.updateProjectionMatrix();
}

export { MainScene as default }