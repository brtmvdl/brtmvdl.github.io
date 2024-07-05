import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createNewPeer } from '../../assets/js/utils/peer.js'
import { createPlane, mathPI } from './utils/functions.js'
import * as COLORS from '../../assets/js/utils/colors.js'
import { PlayerModel } from './models/player.model.js'

const peer = createNewPeer('truco', true)

const scene = new THREE.Scene()
scene.add(new THREE.PolarGridHelper(+8.0, +16.0, +8.0, +64.0))

// game

const table = createPlane(+5.0, +5.0)
table.rotation.set(mathPI(+0.5), +0.0, +0.0)
scene.add(table)

const player1 = new PlayerModel(0)
scene.add(player1.sphere)

const player2 = new PlayerModel(1)
scene.add(player2.sphere)

const player3 = new PlayerModel(2)
scene.add(player3.sphere)

const player4 = new PlayerModel(3)
scene.add(player4.sphere)

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
