import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const __ = {
  getWidth: () => window.innerWidth,
  getHeight: () => window.innerHeight,
  getAspect: () => __.getWidth() / __.getHeight(),
}

const COLORS = {
  BLUE: new THREE.Color(0x0000FF),
  YELLOW: new THREE.Color(0xFFFF99),
  WHITE: new THREE.Color(0xFFFFFF),
  GRAY: new THREE.Color(0x999999),
  BLACK: new THREE.Color(0x000000),
}

const scene = new THREE.Scene()
scene.background = COLORS.YELLOW

const pi = (n) => Math.PI * n

const camera = new THREE.PerspectiveCamera(45, __.getAspect())
camera.position.set(+80.0, +80.0, +80.0)

const renderer = new THREE.WebGLRenderer({ precision: 'lowp' })
renderer.setSize(__.getWidth(), __.getHeight())
document.body.appendChild(renderer.domElement)

document.body.style.margin = '0'

//

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(+100.0, +100.0),
  new THREE.MeshBasicMaterial({
    color: COLORS.GRAY,
    side: THREE.DoubleSide
  }),
)
plane.rotation.set(pi(0.5), pi(1), 0)
scene.add(plane)

//

const controls = new OrbitControls(camera, renderer.domElement)

renderer.setAnimationLoop(() => {
  controls.update()
  renderer.render(scene, camera)
})
