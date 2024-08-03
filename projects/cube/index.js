import * as THREE from '../../assets/js/libs/three/index.js'
import { createCamera } from '../../assets/js/utils/3d.js'

import { planesInCube } from './constants.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import { getWidth, getHeight } from '../../assets/js/utils/window.js'
import { fixDecimals } from '../../assets/js/utils/math.js'
import { createNewPeer } from '../../assets/js/utils/peer.js'

const __ = {
  getSide: () => THREE.DoubleSide,
}

const scene = new THREE.Scene()
const camera = createCamera()
camera.position.set(+5.0, +5.0, +3.0)

const renderer = new THREE.WebGLRenderer()
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(getWidth(), getHeight())
document.body.appendChild(renderer.domElement)
document.body.style.margin = '0rem'

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

const createPlane = (color) => {
  if (!color) throw new Error('It has no color!')

  return new THREE.Mesh(
    new THREE.PlaneGeometry(+1.0, +1.0),
    new THREE.MeshBasicMaterial({ color, side: __.getSide(), }),
  )
}

const createSquare = (...colors) => {
  if (colors.length != 6) throw new Error('It must to have 6 colors!')

  const group = new THREE.Group()

  colors.map((color, ix) => {
    const plane = createPlane(color)
    group.add(plane)

    plane.position.set(planesInCube[ix][0], planesInCube[ix][1], planesInCube[ix][2],)
    plane.userData['position'] = [planesInCube[ix][0], planesInCube[ix][1], planesInCube[ix][2],]

    plane.rotation.set(planesInCube[ix][3], planesInCube[ix][4], planesInCube[ix][5],)
    plane.userData['rotation'] = [planesInCube[ix][3], planesInCube[ix][4], planesInCube[ix][5],]

    return plane
  })

  return group
}

const cube = new THREE.Group()
scene.add(cube)

const m = (n = 1) => fixDecimals(n * 1.1)

Array.from(Array(3)).map((_x, x) => {
  Array.from(Array(3)).map((_y, y) => {
    Array.from(Array(3)).map((_z, z) => {
      const square = createSquare(
        0xff0000,
        0x0000ff,
        0xffffff,
        0x00ff00,
        0xff9900,
        0xffff00,
      )

      square.userData['position'] = [x, y, z].map((ix) => m(ix - 1))
      square.userData['xyz'] = { x, y, z }
      square.position.set(...[x, y, z].map((ix) => m(ix - 1)))
      cube.add(square)
    })
  })
})

const animate = () => {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()

const moves = {
  // normals
  'front': () => console.log('front'),
  'back': () => console.log('back'),
  'left': () => console.log('left'),
  'right': () => console.log('right'),
  'up': () => console.log('up'),
  'down': () => console.log('down'),
  // reverses
  '_front': () => console.log('_front'),
  '_back': () => console.log('_back'),
  '_left': () => console.log('_left'),
  '_right': () => console.log('_right'),
  '_up': () => console.log('_up'),
  '_down': () => console.log('_down'),
}

const keysFunctions = {
  'f': 'front',
  'b': 'back',
  'l': 'left',
  'r': 'right',
  'u': 'up',
  'd': 'down',
}

window.addEventListener('keydown', ({ key, shiftKey }) => {
  const fn = (shiftKey ? '_' : '') + keysFunctions[key.toLocaleLowerCase()]
  moves[fn]?.()
})

const peer = createNewPeer('cube', true)

peer.on('connection', (conn) => {
  conn.on('open', () => {
    conn.on('data', (data) => {
      console.log('data', { data })
    })

    conn.send('hello')
  })
})
