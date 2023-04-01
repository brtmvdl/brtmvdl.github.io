import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
camera.position.set(0, 0, 100)
camera.lookAt(0, 0, 0)

const scene = new THREE.Scene()
const controls = new OrbitControls(camera, renderer.domElement)

scene.add(controls)
