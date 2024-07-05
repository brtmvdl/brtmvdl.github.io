import * as THREE from 'three'
import * as COLORS from '../../assets/js/utils/colors.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color(COLORS.BLACK_1)
scene.fog = new THREE.Fog(COLORS.BLACK_1, +250, +1400)

// box

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(+1, +1, +1),
  new THREE.MeshBasicMaterial({ color: COLORS.RED_1 }),
)
scene.add(cube)

// lights

const dirLight = new THREE.DirectionalLight(COLORS.WHITE_1, +0.4)
dirLight.position.set(cube.position).normalize()
scene.add(dirLight)

const pointLight = new THREE.PointLight(COLORS.WHITE_1, +4.5, +0, +0)
pointLight.color.setHSL(+Math.random(), +1, +0.5)
pointLight.position.set(cube.position) // .normalize()
scene.add(pointLight)

// animate

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, +1, +1500)
camera.position.set(+0, +10, +10)
camera.lookAt(cube.position)

function animate() {
  renderer.clear()
  renderer.render(scene, camera)
}

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)
document.body.style.margin = '+0rem'
