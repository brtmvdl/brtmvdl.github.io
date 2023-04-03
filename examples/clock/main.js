import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import dat from 'dat.gui'
const gui = new dat.GUI({ name: 'Clock' })

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(0, 10, 0)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

const gridHelper = new THREE.GridHelper(7, 70)
scene.add(gridHelper)

const edge = new THREE.Mesh(
  new THREE.CylinderGeometry(3, 2.75, 0.999),
  new THREE.MeshBasicMaterial({ color: 0x333333 })
)
scene.add(edge)

const circle = new THREE.Mesh(
  new THREE.CylinderGeometry(2.75, 2.75, 1),
  new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
)
edge.add(circle)

const hourPointer = new THREE.Mesh(
  new THREE.CylinderGeometry(.05, .01, 4),
  new THREE.MeshBasicMaterial({ color: 0x990000 }),
)
hourPointer.rotation.set(0, 0, Math.PI / 2)
hourPointer.position.set(0, 0.75, 0)
scene.add(hourPointer)

const minutePointer = new THREE.Mesh(
  new THREE.CylinderGeometry(.05, .01, 4),
  new THREE.MeshBasicMaterial({ color: 0x009900 })
)
minutePointer.rotation.set(0, 0, Math.PI / 2)
minutePointer.position.set(0, 0.75, 0)
scene.add(minutePointer)

const secondPointer = new THREE.Mesh(
  new THREE.CylinderGeometry(.05, .01, 4),
  new THREE.MeshBasicMaterial({ color: 0x000099 })
)
secondPointer.rotation.set(0, 0, Math.PI / 2)
secondPointer.position.set(0, 0.75, 0)
scene.add(secondPointer)

const degreeAngle = (angle) => 2 * Math.PI * angle

renderer.setAnimationLoop(() => {
  const date = new Date()
  hourPointer.rotation.y = degreeAngle(-date.getHours() / 12)
  minutePointer.rotation.y = degreeAngle(-date.getMinutes() / 60)
  secondPointer.rotation.y = degreeAngle(-date.getSeconds() / 60)

  controls.update()
  renderer.render(scene, camera)
})
