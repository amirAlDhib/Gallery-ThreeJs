import * as THREE from "/node_modules/three/build/three.module.js";
import { EffectComposer } from "/node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";
import gsap from "/node_modules/gsap/index.js";

//global declaration
let scene;
let camera;
let renderer;
const canvas = document.getElementsByTagName("canvas")[0];
scene = new THREE.Scene();
const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const explore = $(".explore");
var explorer = false;
var cam_z = 0.1;
//camera
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 30;
camera.position.x = 10;
camera.position.y = 10;
scene.add(camera);

//explore
explore.click(() => {
  if(!gsap.isTweening(camera.position)){
    gsap.to(camera.position,{
      duration: 3,
      x: 2,
      y: 0.5,
      z: explorer ? 20 : -6,
      ease: "power3.inOut",
    });
    gsap.to(camera.rotation,{
      duration: 6,
      z: 0,
      x: 0.5,
      y: 3.5,
      ease: "power3.inOut",
    });
    explore[0].innerHTML = explorer ? "start exploring" : "go back";
    explorer = !explorer;
  }
});

window.addEventListener("wheel", function(e) {
  console.log("scrolled",e);
    gsap.to(camera.position,{
      duration: 1,
      x: cam_z + 0.5,
      ease: "power3.inOut",
    });
    cam_z = cam_z + 0.1;
}, true);
const options = {
  gui_x: 0.7,
  gui_y: -2.6,
  gui_z: 0.3,
  gui_ox: 2,
  gui_oy: 0,
  gui_oz: 12,
};

//default renderer
renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.autoClear = false;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.setClearColor(0x000000, 0.0);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//bloom renderer
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 2; //intensity of glow
bloomPass.radius = 0;
const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

//sun object
const color = new THREE.Color("#FDB813");
const geometry = new THREE.IcosahedronGeometry(5, 5);
const material = new THREE.MeshBasicMaterial({ color: color });
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(-20, 23, -20);
sphere.layers.set(1);
scene.add(sphere);
// galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 64, 64);

// galaxy material
const starMaterial = new THREE.MeshBasicMaterial({
  map: THREE.ImageUtils.loadTexture("texture/galaxy.png"),
  side: THREE.BackSide,
  transparent: true,
});

// galaxy mesh
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
starMesh.layers.set(1);
scene.add(starMesh);

//ambient light
const ambientlight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientlight);

// plane
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({
    color:new THREE.Color("#cba982"),
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = 2;
plane.rotation.z = 1;
plane.position.set(5,-2,-2);

// plane 2
const planeGeometry2 = new THREE.PlaneGeometry(10, 10);
const planeMaterial2 = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#c5935a"),
    side: THREE.DoubleSide
});
const plane2 = new THREE.Mesh(planeGeometry2, planeMaterial2);
scene.add(plane2);
plane2.rotation.x = 2;
plane2.rotation.z = 1;
plane2.position.set(5,-1,-2);

// plane 3
const planeGeometry3 = new THREE.PlaneGeometry(6, 6);
const planeMaterial3 = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#d63384"),
    side: THREE.DoubleSide
});
const plane3 = new THREE.Mesh(planeGeometry3, planeMaterial3);
scene.add(plane3);
plane3.rotation.x = -11;
plane3.position.set(-15,0,-15); 
// plane 33
const planeGeometry33 = new THREE.PlaneGeometry(6, 6);
const planeMaterial33 = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#d63384"),
    side: THREE.DoubleSide
});
const plane33 = new THREE.Mesh(planeGeometry33, planeMaterial33);
scene.add(plane33);
plane33.rotation.x = -11;
// plane3.rotation.z = 1;
// plane3.rotation.y = 1;
plane33.position.set(-15,1,-15); 
// plane 4
const planeGeometry4 = new THREE.PlaneGeometry(6, 6);
const planeMaterial4 = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#0d6efd"),
    side: THREE.DoubleSide
});
const plane4 = new THREE.Mesh(planeGeometry4, planeMaterial4);
scene.add(plane4);
plane4.rotation.x = -11;
// plane3.rotation.z = 1;
// plane3.rotation.y = 1;
plane4.position.set(15,0,-15); 
// plane 5
const planeGeometry5 = new THREE.PlaneGeometry(6, 6);
const planeMaterial5 = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#20c997"),
    side: THREE.DoubleSide
});
const plane5 = new THREE.Mesh(planeGeometry5, planeMaterial5);
scene.add(plane5);
plane5.rotation.x = -11;
// plane3.rotation.z = 1;
// plane3.rotation.y = 1;
plane5.position.set(15,0,-30); 
// plane 6
const planeGeometry6 = new THREE.PlaneGeometry(6, 6);
const planeMaterial6 = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#2194ce"),
    side: THREE.DoubleSide
});
const plane6 = new THREE.Mesh(planeGeometry6, planeMaterial6);
scene.add(plane6);
plane6.rotation.x = -11;
// plane3.rotation.z = 1;
// plane3.rotation.y = 1;
plane6.position.set(-15,0,5); 
//sphere01
//const sfgeometry = new THREE.SphereGeometry( 4, 3, 13,2,2,2,6 );
//const sfmaterial = new THREE.MeshBasicMaterial( { color: new THREE.Color("#20c997") } );
//const sphere01 = new THREE.Mesh( sfgeometry, sfmaterial );
//scene.add( sphere01 );
//sphere01.rotation.x = -11;

//sphere01.position.set(-15,2,5); 
//box1
const box1Geometry = new THREE.BoxGeometry(0.1,0.5,1.6);
const box1Material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("#fff"),
});
const box1 = new THREE.Mesh(box1Geometry,box1Material);
scene.add(box1);
box1.rotation.x = 2;
box1.rotation.z = 1;
box1.position.set(10,-2,-2);
//box11
const box11Geometry = new THREE.BoxGeometry(0.1,0.5,1.6);
const box11Material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("#fff"),
});
const box11 = new THREE.Mesh(box11Geometry,box11Material);
scene.add(box11);
box11.rotation.x = 2;
box11.rotation.z = 5;
box11.position.set(8,-2,-2);
//box12
const box12Geometry = new THREE.BoxGeometry(0.1,0.5,1.6);
const box12Material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("#fff"),
});
const box12 = new THREE.Mesh(box12Geometry,box12Material);
scene.add(box12);
box12.rotation.x = 2;
box12.rotation.z = 5;
box12.position.set(2,-2,-2);
//box13
const box13Geometry = new THREE.BoxGeometry(0.1,0.5,1.6);
const box13Material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("#fff"),
});
const box13 = new THREE.Mesh(box13Geometry,box13Material);
scene.add(box13);
box13.rotation.x = 2;
box13.rotation.z = 15;
box13.position.set(0.51,-2,-2);
//box14
const box14Geometry = new THREE.BoxGeometry(0.1,0.5,1.6);
const box14Material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("#fff"),
});
const box14 = new THREE.Mesh(box14Geometry,box14Material);
scene.add(box14);
box14.rotation.x = 2;
box14.rotation.z = 15;
box14.position.set(3,-2,-2);

//box2
const box2Geometry = new THREE.BoxGeometry(0.1,10,1);
const box2Material = new THREE.MeshPhysicalMaterial({
  color: 'cyan',
  transparent: true,
  opacity: 0.4
});
const box2 = new THREE.Mesh(box2Geometry,box2Material);
scene.add(box2);
box2.rotation.x = options.gui_ox;
box2.rotation.y = options.gui_oy;
box2.rotation.z = options.gui_oz;
box2.position.set(options.gui_x,options.gui_y,options.gui_z);
//

//point Light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.castShadow = true;
pointLight.shadowCameraVisible = true;
pointLight.shadowBias = 0.00001;
pointLight.shadowDarkness = 0.2;
pointLight.shadowMapWidth = 2048;
pointLight.shadowMapHeight = 2048;
pointLight.position.set(-50, 20, -60);
scene.add(pointLight);

//resize listner
window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    bloomComposer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

//animation loop
const animate = () => {
  requestAnimationFrame(animate);
  camera.layers.set(1);
  bloomComposer.render();
  renderer.clearDepth();
  camera.layers.set(0);
  renderer.render(scene, camera);
};

animate();
