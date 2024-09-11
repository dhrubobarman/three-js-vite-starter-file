import "./style.css";
import * as THREE from "three";
import getLayer from "./getLayer";
import Stats from "three/addons/libs/stats.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createElement } from "./utils";

const canvas = createElement("canvas");
const container = createElement("div", { id: "container" });
const stats = new Stats();
stats.showPanel(1);
container.appendChild(stats.dom);

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 12;
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(w, h);

const ctrls = new OrbitControls(camera, renderer.domElement);
ctrls.enableDamping = true;

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0xffff00,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Sprites BG
const gradientBackground = getLayer({
  hue: 0.5,
  numSprites: 8,
  opacity: 0.2,
  radius: 10,
  size: 24,
  z: -15.5,
});

gradientBackground.scale.setScalar(2);
scene.add(gradientBackground);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  ctrls.update();
  stats.update();
}

animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
