import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

const helvetiker = '../../libs/three/examples/fonts/helvetiker_regular.typeface.json'

import dat from 'dat.gui'
const gui = new dat.GUI({ name: 'Clock' })

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500)
camera.position.set(-10, 20, 0)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

// const gridHelper = new THREE.GridHelper(10, 100)
// scene.add(gridHelper)

const origin = new THREE.Mesh(
  new THREE.CylinderGeometry(Math.PI / 16, .1, 1),
  new THREE.MeshBasicMaterial({ color: 0x333333 })
)
origin.position.set(0, 2 / 5, 0)
scene.add(origin)

const clock = new THREE.Mesh(
  new THREE.CylinderGeometry(Math.PI * 18 / 12, 2.75, 0.999),
  new THREE.MeshBasicMaterial({ color: 0x333333 })
)
scene.add(clock)

const edge = new THREE.Mesh(
  new THREE.CylinderGeometry(Math.PI * 16 / 12, 2.75, 1),
  new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
)
clock.add(edge)

const hourPointer = new THREE.Mesh(
  new THREE.CylinderGeometry(.05, .01, 4),
  new THREE.MeshBasicMaterial({ color: 0x666666 }),
)
hourPointer.rotation.set(0, 0, -Math.PI / 2)
hourPointer.position.set(0, 0.75, 0)
scene.add(hourPointer)

const minutePointer = new THREE.Mesh(
  new THREE.CylinderGeometry(.05, .01, 4),
  new THREE.MeshBasicMaterial({ color: 0x999999 })
)
minutePointer.rotation.set(0, 0, -Math.PI / 2)
minutePointer.position.set(0, 0.75, 0)
scene.add(minutePointer)

const secondPointer = new THREE.Mesh(
  new THREE.CylinderGeometry(.05, .01, 4),
  new THREE.MeshBasicMaterial({ color: 0xcccccc })
)
secondPointer.rotation.set(0, 0, -Math.PI / 2)
secondPointer.position.set(0, 0.75, 0)
scene.add(secondPointer)

const fonts = {}

const loadFont = (name) => new Promise((res, rej) => {
  if (fonts[name]) return res(fonts[name])
  const loader = new FontLoader()
  loader.load(name, (font) => res(font), () => { }, (err) => rej(err))
})

const size = 1 / 2
const height = 1 / 50

const matcap = new THREE.TextureLoader().load('./textTexture.png')

Array.from(['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',])
  .forEach((num, angle) => loadFont(helvetiker)
    .then((font) => {
      const textGeometry = new TextGeometry(num, { font, size, height })
      textGeometry.center()

      const textMesh = new THREE.Mesh(
        textGeometry,
        new THREE.MeshMatcapMaterial({ matcap })
      )
      textMesh.rotation.set(Math.PI * 3 / 2, 0, -Math.PI / 2)

      const hyp = Math.PI
      textMesh.position.x = hyp * Math.cos(angle * Math.PI / 6)
      textMesh.position.y = 0.75
      textMesh.position.z = hyp * Math.sin(angle * Math.PI / 6)

      scene.add(textMesh)
    }))

const degreeAngle = (angle) => 2 * Math.PI * angle

renderer.setAnimationLoop(() => {
  const date = new Date()

  const hourRotation = degreeAngle(-date.getHours() / 12)
  const minuteRotation = degreeAngle(-date.getMinutes() / 60)
  const secondRotation = degreeAngle(-date.getSeconds() / 60)

  hourPointer.rotation.y = hourRotation
  minutePointer.rotation.y = minuteRotation
  secondPointer.rotation.y = secondRotation

  controls.update()
  renderer.render(scene, camera)
})
