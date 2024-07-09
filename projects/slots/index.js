import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as COLORS from '../../assets/js/utils/colors.js'
import { radian } from '../../assets/js/utils/3d.js'

const scene = new THREE.Scene()
scene.add(new THREE.GridHelper(+10.0, +10.0))

//

const params = { segments: +8.0, }

const state = { running: false, }

//

const randomNum = (num = 100) => Math.floor(Math.random() * num) + 1

//

const cylinders = Array.from(Array(+3.0)).map((_, ix) => {
  const c = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 1, 8, 1, true),
    new THREE.MeshBasicMaterial({ color: COLORS.WHITE_1 }),
  )

  // createCylinder(+1.0, +1.0, { segments: params.segments, color: COLORS.YELLOW_1, openEnded: true })

  c.position.set((ix * +1.5) - +1.5, +1.0, +1.0)
  c.rotation.set(+0.0, +0.0, radian(+90.0))
  return c
})
Array.from(cylinders).map((c) => scene.add(c))

//

const rotateCylinders = () => {
  if (!state.running) {
    state.running = true
    Array.from(cylinders).map((c, ix) => {
      const r = +50.0 + randomNum(+100.0)
      let i = 0
      const id = setInterval(() => {
        c.rotation.x += (radian((+90.0 * i++) / (params.segments / 4))) % radian(+360.0)
        const { x, y, z } = c.rotation
        console.log([ix, x, y, z])
        if (i > r) {
          clearInterval(id)
          state.running = false
        }
      }, 50)
    })
  }
}

window.addEventListener('keypress', ({ key }) => {
  switch (key) {
    case 'Enter': return rotateCylinders()
  }
  console.log('keypress', ({ key }))
})

//

const camera = new THREE.PerspectiveCamera(+45.0, window.innerWidth / window.innerHeight, +1.0, +1000.0)
camera.position.set(+0.0, +5.0, +5.0)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)
document.body.style.margin = '0rem'

const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
  renderer.clear()
  renderer.render(scene, camera)
  controls.update()
}
