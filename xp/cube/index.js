import * as THREE from 'three'
import { ArcballControls } from 'three/addons/controls/ArcballControls.js'
import { planesInCube } from './constants.js'

const __ = {
  getWidth: () => window.innerWidth,
  getHeight: () => window.innerHeight,
  getSide: () => THREE.DoubleSide,
  // getPI: () => Math.PI / 2,
}

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, __.getWidth() / __.getHeight(), 1e-1, 1e4)
camera.position.set(+7.5, +7.5, +7.5)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(__.getWidth(), __.getHeight())
document.body.appendChild(renderer.domElement)
document.body.style.margin = '0rem'

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

      square.userData['position'] = [x, y, z].map((ix) => (ix - 1) * 1.1)
      square.userData['xyz'] = { x, y, z }
      square.position.set(...[x, y, z].map((ix) => (ix - 1) * 1.1))
      cube.add(square)
    })
  })
})

const controls = new ArcballControls(camera, renderer.domElement, scene)

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

  if (key === 'Escape') controls.reset()
})
