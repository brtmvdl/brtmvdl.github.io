import * as THREE from '../../assets/js/libs/three/index.js'
import { getWidth, getHeight } from '../../assets/js/utils/window.js'
import { createCamera } from '../../assets/js/utils/3d.js'
import { createNewPeer } from '../../assets/js/utils/peer.js'
import * as COLORS from '../../assets/js/utils/colors.js'

const scene = new THREE.Scene()

scene.add(new THREE.GridHelper(+100.0, +100.0, COLORS.WHITE))

const camera = createCamera()
camera.position.set(+10.0, +10.0, +0.0)

const renderer = new THREE.WebGLRenderer({ precision: 'lowp' })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(getWidth(), getHeight())
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

const peer = createNewPeer('airplane', true)

peer.on('connection', function (conn) {
  conn.on('data', function ({ text, fn } = {}) {
    console.log('conn data', { peer, text, fn })
    params[fn]?.()
  })
})
