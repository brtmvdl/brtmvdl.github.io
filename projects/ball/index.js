import { qrcode } from '../../assets/js/utils/functions.js'
import * as THREE from 'three'
import { Peer } from 'https://esm.sh/peerjs@1.5.4?bundle-deps'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

THREE.Cache.enabled = true

let container

let camera, cameraTarget, scene, renderer

let group, textMesh1, textMesh2, textGeo, materials

let firstLetter = true

let text = 'three.js',
  bevelEnabled = true,
  font = undefined,
  fontName = 'optimer', // helvetiker, optimer, gentilis, droid sans, droid serif
  fontWeight = 'bold' // normal bol

const depth = 20,
  size = 70,
  hover = 30,
  curveSegments = 4,
  bevelThickness = 2,
  bevelSize = 1.5

const mirror = true

const fontMap = {
  'helvetiker': 0,
  'optimer': 1,
  'gentilis': 2,
  'droid/droid_sans': 3,
  'droid/droid_serif': 4
}

const weightMap = {
  'regular': 0,
  'bold': 1
}

const reverseFontMap = []
const reverseWeightMap = []

for (const i in fontMap) reverseFontMap[fontMap[i]] = i
for (const i in weightMap) reverseWeightMap[weightMap[i]] = i

let targetRotation = 0
let targetRotationOnPointerDown = 0
let pointerX = 0
let pointerXOnPointerDown = 0
let windowHalfX = window.innerWidth / 2
let fontIndex = 1

const createQrcodeImage = (id) => {
  const image = document.createElement('img')
  const url = new URL(window.location)
  url.pathname = `/projects/ball/controls.html?id=${id}`
  const qrcode_url = url.toString()
  console.log({ qrcode_url })
  image.src = qrcode(qrcode_url)
  image.style.position = 'fixed'
  image.style.left = '1rem'
  image.style.bottom = '1rem'
  document.body.append(image)
}

init()

function init() {
  container = document.createElement('div')
  document.body.appendChild(container)

  // CAMERA

  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500)
  camera.position.set(0, 400, 700)

  cameraTarget = new THREE.Vector3(0, 150, 0)

  // SCENE

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)
  scene.fog = new THREE.Fog(0x000000, 250, 1400)

  // LIGHTS

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.4)
  dirLight.position.set(0, 0, 1).normalize()
  scene.add(dirLight)

  const pointLight = new THREE.PointLight(0xffffff, 4.5, 0, 0)
  pointLight.color.setHSL(Math.random(), 1, 0.5)
  pointLight.position.set(0, 100, 90)
  scene.add(pointLight)

  materials = [
    new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
    new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
  ]

  group = new THREE.Group()
  group.position.y = 100

  scene.add(group)

  loadFont()

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10000, 10000),
    new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true })
  )
  plane.position.y = 100
  plane.rotation.x = - Math.PI / 2
  scene.add(plane)

  // RENDERER

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setAnimationLoop(animate)
  container.appendChild(renderer.domElement)

  // EVENTS

  container.style.touchAction = 'none'
  container.addEventListener('pointerdown', onPointerDown)

  document.addEventListener('keypress', onDocumentKeyPress)
  document.addEventListener('keydown', onDocumentKeyDown)

  //

  const params = {
    write: function (_text) {
      text = ''
      refreshText()
      Array.from((_text).split()).map((letter, ix) => {
        setTimeout(() => {
          text += letter
          refreshText()
        }, (ix * 500))
      })
    },
    changeColor: function () {

      pointLight.color.setHSL(Math.random(), 1, 0.5)

    },
    changeFont: function () {

      fontIndex++

      fontName = reverseFontMap[fontIndex % reverseFontMap.length]

      loadFont()

    },
    changeWeight: function () {

      if (fontWeight === 'bold') {

        fontWeight = 'regular'

      } else {

        fontWeight = 'bold'

      }

      loadFont()

    },
    changeBevel: function () {

      bevelEnabled = !bevelEnabled

      refreshText()

    },
    openControls: function () {
      const url = new URL(window.location)

      url.pathname = './projects/ball/controls1.html'

      url.searchParams.append('id', peer.id)

      window.open(url)
    }
  }

  //

  window.addEventListener('resize', onWindowResize)

  //

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

      if (params[fn]) {
        params[fn]()
        return
      } else {
        params.write(text)
      }
    })
  })

  peer.on('open', () => {
    console.log('peer open')
    const PEER_ID = peer.id
    console.log({ PEER_ID })
    createQrcodeImage(PEER_ID)
  })

  peer.on('error', () => console.log('peer error'))

  peer.on('close', () => console.log('peer close'))

}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

//

function onDocumentKeyDown(event) {
  if (firstLetter) {
    firstLetter = false
    text = ''
  }

  const keyCode = event.keyCode

  // backspace

  if (keyCode == 8) {
    event.preventDefault()
    text = text.substring(0, text.length - 1)
    refreshText()
    return false
  }
}

function onDocumentKeyPress(event) {
  const keyCode = event.which
  // backspace
  if (keyCode == 8) {
    event.preventDefault()
  } else {
    const ch = String.fromCharCode(keyCode)
    text += ch
    refreshText()
  }
}

function loadFont() {
  const loader = new FontLoader()
  loader.load('fonts/' + fontName + '_' + fontWeight + '.typeface.json', function (response) {
    font = response
    refreshText()
  })
}

function createText() {

  textGeo = new TextGeometry(text, {
    font: font,
    size: size,
    depth: depth,
    curveSegments: curveSegments,
    bevelThickness: bevelThickness,
    bevelSize: bevelSize,
    bevelEnabled: bevelEnabled
  })

  textGeo.computeBoundingBox()

  const centerOffset = - 0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x)
  textMesh1 = new THREE.Mesh(textGeo, materials)
  textMesh1.position.x = centerOffset
  textMesh1.position.y = hover
  textMesh1.position.z = 0
  textMesh1.rotation.x = 0
  textMesh1.rotation.y = Math.PI * 2
  group.add(textMesh1)

  if (mirror) {
    textMesh2 = new THREE.Mesh(textGeo, materials)
    textMesh2.position.x = centerOffset
    textMesh2.position.y = - hover
    textMesh2.position.z = depth
    textMesh2.rotation.x = Math.PI
    textMesh2.rotation.y = Math.PI * 2
    group.add(textMesh2)
  }
}

function refreshText() {
  group.remove(textMesh1)
  if (mirror) group.remove(textMesh2)
  if (!text) return
  createText()
}

function onPointerDown(event) {
  if (event.isPrimary === false) return
  pointerXOnPointerDown = event.clientX - windowHalfX
  targetRotationOnPointerDown = targetRotation
  document.addEventListener('pointermove', onPointerMove)
  document.addEventListener('pointerup', onPointerUp)
}

function onPointerMove(event) {
  if (event.isPrimary === false) return
  pointerX = event.clientX - windowHalfX
  targetRotation = targetRotationOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.02
}

function onPointerUp() {
  if (event.isPrimary === false) return
  document.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerup', onPointerUp)
}

//

function animate() {
  group.rotation.y += (targetRotation - group.rotation.y) * 0.05
  camera.lookAt(cameraTarget)
  renderer.clear()
  renderer.render(scene, camera)
}
