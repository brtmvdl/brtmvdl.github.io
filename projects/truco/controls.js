import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createNewPeer } from '../../assets/js/utils/peer.js'
import { createPlane, radian } from './utils/functions.js'
import { getURLSearchParam } from '../../assets/js/utils/url.js'
import * as COLORS from '../../assets/js/utils/colors.js'

const scene = new THREE.Scene()

// game

const cards = new THREE.Group()
scene.add(cards)

Array.from(Array(3)).map((_, ix) => {
  const card = createPlane(+0.2, +0.5)
  card.rotation.set(radian(+90.0), +0.0, +0.0)
  card.position.set((ix * +0.25) - +0.25, +0.0, +0.0)
  cards.add(card)
})

// lights

const pointLight = new THREE.PointLight(COLORS.WHITE_1, +4.5, +0, +0)
pointLight.color.setHSL(+Math.random(), +1, +0.5)
scene.add(pointLight)

// animate

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, +1, +1500)
camera.position.set(+0.0, +1.0, +1.0)

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

const peer = createNewPeer('truco')

peer.on('connection', (conn) => {
  console.log('peer connection', { peer, conn })
})

peer.on('open', (open) => {
  console.log('peer open', { peer, open })

  const conn = peer.connect(getURLSearchParam('id'))

  conn.on('open', (open) => {
    console.log('conn open', { peer, conn, open })
    conn.send('hello')
  })

  conn.on('close', (close) => {
    console.log('conn close', { peer, conn, close })
  })

  conn.on('error', (error) => {
    console.log('conn error', { peer, conn, error })
  })

  conn.on('data', (data) => {
    console.log('conn data', { peer, conn, data })
  })
})

peer.on('error', (error) => {
  console.log('peer error', { peer, error })
})

peer.on('close', (close) => {
  console.log('peer close', { peer, close })
})
