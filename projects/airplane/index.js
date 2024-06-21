import * as THREE from 'three'
import { qrcode } from '../../assets/js/utils/functions.js'

const __ = {
  getWidth: () => window.innerWidth,
  getHeight: () => window.innerHeight,
  getAspect: () => __.getWidth() / __.getHeight(),
  getControlsUrl: () => {
    const url = new URL(window.location)
    url.pathname = '/projects/airplane/controls.html'
    return url.toString()
  }
}

const COLORS = { YELLOW: 0xFFFF00, WHITE: 0xFFFFFF, }

const scene = new THREE.Scene()

const grid = new THREE.GridHelper(100, 100, COLORS.WHITE)
scene.add(grid)

const camera = new THREE.PerspectiveCamera(45, __.getAspect())
camera.position.set(+10.0, +10.0, +0.0)

const renderer = new THREE.WebGLRenderer({ precision: 'lowp' })
renderer.setSize(__.getWidth(), __.getHeight())
document.body.appendChild(renderer.domElement)
document.body.style.margin = '0'

const image = document.createElement('img')
image.src = qrcode(__.getControlsUrl())
image.style.position = 'fixed'
image.style.left = '1rem'
image.style.bottom = '1rem'
document.body.append(image)

renderer.setAnimationLoop(() => {
  renderer.render(scene, camera)
})
