import * as COLORS from '../../assets/js/utils/colors.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createNewPeer } from '../../assets/js/utils/peer.js'

const peer = createNewPeer('truco')

const scene = new THREE.Scene()
scene.add(new THREE.PolarGridHelper(+8.0, +16.0, +8.0, +64.0))

// functions

const createPlane = (width = +1.0, height = +1.0) => {
  const geometry = new THREE.PlaneGeometry(+width, +height)
  const material = new THREE.MeshBasicMaterial({ color: COLORS.WHITE_1, side: THREE.DoubleSide })
  const plane = new THREE.Mesh(geometry, material)
  return plane
}

const createSphere = (radius = +1.0, segments = 5) => {
  const geometry = new THREE.SphereGeometry(radius, 2 ** segments, 2 ** (segments - 1))
  const material = new THREE.MeshBasicMaterial({ color: COLORS.WHITE_1 })
  const sphere = new THREE.Mesh(geometry, material)
  return sphere
}

const mathPI = (num) => Math.PI * num

// game

const table = createPlane(+5.0, +5.0)
table.rotation.set(mathPI(+0.5), +0.0, +0.0)
scene.add(table)

const player1 = createSphere(+0.1)
player1.position.set(+5.0, +0.5, +0.0)
scene.add(player1)

const player2 = createSphere(+0.1)
player2.position.set(-5.0, +0.5, +0.0)
scene.add(player2)

const player3 = createSphere(+0.1)
player3.position.set(+0.0, +0.5, +5.0)
scene.add(player3)

const player4 = createSphere(+0.1)
player4.position.set(-0.0, +0.5, -5.0)
scene.add(player4)

// lights

const pointLight = new THREE.PointLight(COLORS.WHITE_1, +4.5, +0, +0)
pointLight.color.setHSL(+Math.random(), +1, +0.5)
scene.add(pointLight)

// animate

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, +1, +1500)
camera.position.set(+10.0, +10.0, +10.0)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)
document.body.style.margin = '+0rem'

const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
  renderer.clear()
  renderer.render(scene, camera)
  controls.update()
}
