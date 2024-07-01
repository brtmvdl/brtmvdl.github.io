import { qrcode } from '../../assets/js/utils/functions.js'
import * as THREE from 'three'
import { Peer } from 'https://esm.sh/peerjs@1.5.4?bundle-deps'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const {
  innerHeight: HEIGHT,
  innerWidth: WIDTH,
  requestAnimationFrame,
} = window

document.body.style.margin = '0px'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//

camera.position.set(0, 15, 25)

const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
})
const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box)

const planeGeometry = new THREE.PlaneGeometry(30, 30)
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -0.5 * Math.PI
scene.add(plane)

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper)

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0xffcc00,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(-10, 10, 0)
scene.add(sphere)

const options = {
  // sphereColor: '#ffcc00',
  wireframe: false,
  speed: 0.01,
}

let step = 0

  ;;

//

function animate() {
  box.rotation.x += 1 / 100
  box.rotation.y += 1 / 100

  step += options.speed
  sphere.position.y = 10 * Math.abs(Math.sin(step))

  // controls.update()

  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

const random = (num = 100) => Math.floor(Math.random() * num)

const params = {
  square_color: () => box.material.color = new THREE.Color(`rgb(${random(255)},${random(255)},${random(255)})`),
  ball_color: () => sphere.material.color = new THREE.Color(`rgb(${random(255)},${random(255)},${random(255)})`),
}

const peer = new Peer()

peer.on('connection', function (conn) {
  console.log('peer connection', { conn })

  conn.on('open', function (open) {
    console.log('conn open', { open })
  })

  conn.on('close', function (close) {
    console.log('conn close', { close })
  })

  conn.on('error', function (error) {
    console.log('conn error', { error })
  })

  conn.on('data', function ({ text, fn } = {}) {
    console.log('conn data', { text, fn })
    params[fn]()
  })
})

peer.on('open', () => {
  console.log('peer open')
  const PEER_ID = peer.id
  console.log({ PEER_ID })
  createQrcodeImage(createControlsUrl(PEER_ID))
})

peer.on('error', () => console.log('peer error'))

peer.on('close', () => console.log('peer close'))

const createControlsUrl = (id) => {
  const url = new URL(window.location)
  url.pathname = `/projects/three.js-sample/controls.html?id=${id}`
  return url.toString()
}

const createQrcodeImage = (url) => {
  console.log({ url })
  const image = document.createElement('img')
  image.src = qrcode(url)
  image.style.position = 'fixed'
  image.style.left = '1rem'
  image.style.bottom = '1rem'
  document.body.append(image)
}
