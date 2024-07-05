import * as COLORS from '../../assets/js/utils/colors.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createNewPeer } from '../../assets/js/utils/peer.js'
import { createPlane, mathPI } from './functions.js'

const peer = createNewPeer('truco')

const scene = new THREE.Scene()
scene.add(new THREE.GridHelper(+15.0, +15.0))

// game

const createCard = () => {
  const card = createPlane(+2.0, +5.0)
  card.rotation.set(mathPI(+0.5), +0.0, +0.0)
  return card
}

const card1 = createCard()
card1.position.set(+5.0, +0.0, +0.0)
scene.add(card1)

const card2 = createCard()
card2.position.set(+0.0, +0.0, +0.0)
scene.add(card2)

const card3 = createCard()
card3.position.set(-5.0, +0.0, +0.0)
scene.add(card3)

// lights

const pointLight = new THREE.PointLight(COLORS.WHITE_1, +4.5, +0, +0)
pointLight.color.setHSL(+Math.random(), +1, +0.5)
scene.add(pointLight)

// animate

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, +1, +1500)
camera.position.set(+0.0, +20.0, +10.0)

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
