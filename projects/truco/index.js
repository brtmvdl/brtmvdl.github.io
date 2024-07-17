import * as THREE from '../../assets/js/libs/three/index.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createNewPeer } from '../../assets/js/utils/peer.js'
import { createPlane, radian } from './utils/functions.js'
import * as COLORS from '../../assets/js/utils/colors.js'
import { PlayerModel } from './models/player.model.js'

const scene = new THREE.Scene()
scene.add(new THREE.PolarGridHelper(+8.0, +16.0, +8.0, +64.0))

// game

const table = createPlane(+5.0, +5.0)
table.rotation.set(radian(90), +0.0, +0.0)
scene.add(table)

const players = []

Array.from(Array(4)).map((_, ix) => {
  const p = new PlayerModel(ix)
  scene.add(p.mesh)
  players.push(p)
})

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

const peer = createNewPeer('truco', true)

peer.on('connection', (conn) => {
  Array.from(players).find((p) => !p.getConnection())?.setConnection(conn)

  if (Array.from(players).reduce((count, p) => { return count + (p.getConnection() ? 1 : 0) }, 0) == 4) {
    peer.removeQRCode()
  }
})
