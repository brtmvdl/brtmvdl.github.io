'use strict'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

document.body.style.margin = '0px'

//

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 1000)
camera.position.set(-10, 30, 30)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff9900 })
const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box)

const planeGeometry = new THREE.PlaneGeometry(30, 30)
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)

plane.rotation.x = -0.5 * Math.PI

const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper)

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
const sphereMaterial = new THREE.MeshBasicMaterial({ 
  color: 0xff9900,
  // wireframe: true,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(-10, 10, 0)
scene.add(sphere)

function render(time) {
  box.rotation.x = time / 1000
  box.rotation.y = time / 1000

  // 

  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

requestAnimationFrame(render)
