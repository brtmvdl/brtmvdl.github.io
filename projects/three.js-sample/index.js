import * as THREE from '../../assets/js/libs/three/index.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import { getWidth, getHeight } from '../../assets/js/utils/window.js'
import { createCamera } from '../../assets/js/utils/3d.js'

document.body.style.margin = '0px'

const scene = new THREE.Scene()
const camera = createCamera()

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const renderer = new THREE.WebGLRenderer()
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(getWidth(), getHeight())
document.body.appendChild(renderer.domElement)

//

camera.position.set(0, 15, 25)

const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
})
const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box)

const planeGeometry = new THREE.PlaneGeometry(30, 30)
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -0.5 * Math.PI
scene.add(plane)

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper)

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0xffcc00,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(-10, 10, 0)
scene.add(sphere)

const options = {
  // sphereColor: '#ffcc00',
  wireframe: false,
  speed: 0.01,
}

let step = 0

  ;;

//

function animate() {
  box.rotation.x += 1 / 100
  box.rotation.y += 1 / 100

  step += options.speed
  sphere.position.y = 10 * Math.abs(Math.sin(step))

  // controls.update()

  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

const random = (num = 100) => Math.floor(Math.random() * num)
