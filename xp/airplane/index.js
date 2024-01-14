import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const __ = {
  getWidth: () => window.innerWidth,
  getHeight: () => window.innerHeight,
  getAspect: () => __.getWidth() / __.getHeight(),
}

const COLORS = {
  YELLOW: 0xFFFF00,
  WHITE: 0xFFFFFF,
}

const scene = new THREE.Scene()

const grid = new THREE.GridHelper(100, 100, COLORS.WHITE)
scene.add(grid)

const camera = new THREE.PerspectiveCamera(45, __.getAspect())
camera.position.set(+10.0, +10.0, +0.0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(__.getWidth(), __.getHeight())
document.body.appendChild(renderer.domElement)

document.body.style.margin = '0'

const controls = new OrbitControls(camera, renderer.domElement);

renderer.setAnimationLoop(() => {
  controls.update()

  renderer.render(scene, camera)
})
