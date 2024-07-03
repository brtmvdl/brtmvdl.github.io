import * as THREE from 'three'
import { qrcode } from '../../assets/js/utils/functions.js'
import { Peer } from 'https://esm.sh/peerjs@1.5.4?bundle-deps'

const __ = {
  getWidth: () => window.innerWidth,
  getHeight: () => window.innerHeight,
  getAspect: () => __.getWidth() / __.getHeight(),
  createControlsUrl: (id) => {
    const url = new URL(window.location)
    url.pathname = `/projects/airplane/controls.html?id=${id}`
    return url.toString()
  },
  createQrcodeImage: (url) => {
    console.log('url', (url).replace('%3F', '?'))
    const image = document.createElement('img')
    image.src = qrcode(url)
    image.style.position = 'fixed'
    image.style.left = '1rem'
    image.style.bottom = '1rem'
    document.body.append(image)
  }
}

const COLORS = { YELLOW: 0xFFFF00, WHITE: 0xFFFFFF, }

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
  up: () => camera.position.y += 0.1,
  down: () => camera.position.y -= 0.1,
  left: () => camera.position.x += 0.1,
  right: () => camera.position.x -= 0.1,
  front: () => camera.position.z += 0.1,
  down: () => camera.position.z -= 0.1,
}

const peer = new Peer()

peer.on('connection', function (conn) {
  console.log('peer connection', { peer, conn })

  conn.on('open', function (open) {
    console.log('conn open', { peer, open })
  })

  conn.on('close', function (close) {
    console.log('conn close', { peer, close })
  })

  conn.on('error', function (error) {
    console.log('conn error', { peer, error })
  })

  conn.on('data', function ({ text, fn } = {}) {
    console.log('conn data', { peer, text, fn })

    params[fn]?.()
  })
})

peer.on('open', () => {
  console.log('peer open')
  __.createQrcodeImage(__.createControlsUrl(peer.id))
})

peer.on('error', () => console.log('peer error'))

peer.on('close', () => console.log('peer close'))
