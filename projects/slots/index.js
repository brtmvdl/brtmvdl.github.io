import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createCylinderGeometry } from './geometries/cylinder.geometry.js'
import { radian } from '../../assets/js/utils/3d.js'

const scene = new THREE.Scene()
scene.add(new THREE.GridHelper(+10.0, +10.0))

//

const params = { segments: +8.0, }

const state = { running: false, }

const randomNum = (num = 100) => Math.floor(Math.random() * num) + 1

const cylinders = Array.from(Array(+3.0)).map((_, ix) => {
  const c = createCylinderGeometry({ planeSize: +10.0 })
  c.position.set((ix * +10) - +10, +0.0, +1.0)
  c.rotation.set(+0.0, +0.0, radian(+90.0))
  return c
})
Array.from(cylinders).map((c) => scene.add(c))

//

const camera = new THREE.PerspectiveCamera(+45.0, window.innerWidth / window.innerHeight, +1.0, +1000.0)
camera.position.set(+0.0, +2.0, +8.0)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)
document.body.style.margin = '0rem'

const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
  renderer.clear()
  renderer.render(scene, camera)
  controls.update()
}
