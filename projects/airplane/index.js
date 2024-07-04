import * as THREE from 'three'
import { createNewPeer } from '../../assets/js/utils/peer.js'
import * as COLORS from '../../assets/js/utils/colors.js'

const __ = {
  getWidth: () => window.innerWidth,
  getHeight: () => window.innerHeight,
  getAspect: () => __.getWidth() / __.getHeight(),
}

const scene = new THREE.Scene()

scene.add(new THREE.GridHelper(+100.0, +100.0, COLORS.WHITE))

const camera = new THREE.PerspectiveCamera(45, __.getAspect())
camera.position.set(+10.0, +10.0, +0.0)

const renderer = new THREE.WebGLRenderer({ precision: 'lowp' })
renderer.setSize(__.getWidth(), __.getHeight())
document.body.appendChild(renderer.domElement)
document.body.style.margin = '0rem'

renderer.setAnimationLoop(() => {
  renderer.render(scene, camera)
})

const params = {
  up: () => camera.position.y += +0.1,
  down: () => camera.position.y += -0.1,
  left: () => camera.position.x += -0.1,
  right: () => camera.position.x += +0.1,
  front: () => camera.position.z += -0.1,
  back: () => camera.position.z += +0.1,
}

const peer = createNewPeer('airplane')

peer.on('connection', function (conn) {
  conn.on('data', function ({ text, fn } = {}) {
    console.log('conn data', { peer, text, fn })
    params[fn]?.()
  })
})
