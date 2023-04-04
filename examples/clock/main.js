import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

const helvetiker = '../../libs/three/examples/fonts/helvetiker_regular.typeface.json'

import dat from 'dat.gui'
const gui = new dat.GUI({ name: 'Clock' })

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500)
camera.position.set(0, 10, 10)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
box.position.set(0, 0, -Math.PI / 2)
scene.add(box)

const gridHelper = new THREE.GridHelper(7, 70)
scene.add(gridHelper)

const edge = new THREE.Mesh(
  new THREE.CylinderGeometry(3, 2.75, 0.999),
  new THREE.MeshBasicMaterial({ color: 0x333333 })
)
scene.add(edge)

const circle = new THREE.Mesh(
  new THREE.CylinderGeometry(2.75, 2.75, 1),
  new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
)
edge.add(circle)

const hourPointer = new THREE.Mesh(
  new THREE.CylinderGeometry(.05, .01, 4),
  new THREE.MeshBasicMaterial({ color: 0x990000 }),
)
hourPointer.rotation.set(0, 0, Math.PI / 2)
hourPointer.position.set(0, 0.75, 0)
scene.add(hourPointer)

const minutePointer = new THREE.Mesh(
  new THREE.CylinderGeometry(.05, .01, 4),
  new THREE.MeshBasicMaterial({ color: 0x009900 })
)
minutePointer.rotation.set(0, 0, Math.PI / 2)
minutePointer.position.set(0, 0.75, 0)
scene.add(minutePointer)

const secondPointer = new THREE.Mesh(
  new THREE.CylinderGeometry(.05, .01, 4),
  new THREE.MeshBasicMaterial({ color: 0x000099 })
)
secondPointer.rotation.set(0, 0, Math.PI / 2)
secondPointer.position.set(0, 0.75, 0)
scene.add(secondPointer)

const fonts = {}

const loadFont = (name) => {
  return new Promise((resolve, reject) => {
    if (fonts[name]) return resolve(fonts[name])

    const loader = new FontLoader()
    loader.load(
      name,
      (font) => resolve(font),
      (xhr) => console.log({ xhr }),
      (err) => reject(err),
    )
  })
}

loadFont(helvetiker)
  .then((font) => {
    const textGeometry = new TextGeometry('12', {
      font: font,
      size: 0.5,
      height: 0.2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4
    })

    textGeometry.center()

    const text = new THREE.Mesh(
      textGeometry,
      new THREE.MeshMatcapMaterial({
        matcap: new THREE.TextureLoader().load('./ball.png')
      })
    )

    text.rotation.set(Math.PI * 1.5, Math.PI * 0, Math.PI * 0)
    text.position.set(0, 0.75, -2)

    scene.add(text)
  })

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
