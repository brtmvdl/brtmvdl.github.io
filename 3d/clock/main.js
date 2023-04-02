import * as THREE from '../../node_modules/three/build/three.module.js'
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js'

import dat from '../../node_modules/dat.gui/build/dat.gui.module.js'
const gui = new dat.GUI({ name: 'Clock' })

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(5, 5, 5)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

const axesHelper = new THREE.AxesHelper(10)
scene.add(axesHelper)

const gridHelper = new THREE.GridHelper(10, 100)
scene.add(gridHelper)

const edgeGeometry = new THREE.CylinderGeometry(3, 2.75, 0.999)
const edgeMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 })
const edge = new THREE.Mesh(edgeGeometry, edgeMaterial)
scene.add(edge)

const circleGeometry = new THREE.CylinderGeometry(2.75, 2.75, 1)
const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
const circle = new THREE.Mesh(circleGeometry, circleMaterial)
edge.add(circle)

const hourGeometry = new THREE.CylinderGeometry(.1, .1, 5)
const hourMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 })
const hourPointer = new THREE.Mesh(hourGeometry, hourMaterial)
hourPointer.rotation.set(0, 0, Math.PI / 2)
hourPointer.position.set(-2.5, 0.75, 0)
scene.add(hourPointer)

const minuteGeometry = new THREE.CylinderGeometry(.1, .1, 5)
const minuteMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 })
const minutePointer = new THREE.Mesh(minuteGeometry, minuteMaterial)
minutePointer.rotation.set(0, 0, Math.PI / 2)
minutePointer.position.set(-2.5, 0.75, 0)
scene.add(minutePointer)

renderer.setAnimationLoop(time => {
  // console.log({ time })
  controls.update()
  renderer.render(scene, camera)
})
