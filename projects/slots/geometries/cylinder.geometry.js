import * as THREE from '../../../assets/js/libs/three/index.js'

const loader = new THREE.TextureLoader()

const textures = [
  loader.load('/projects/slots/images/square.black.png'),
  loader.load('/projects/slots/images/square.red.png'),
  loader.load('/projects/slots/images/square.black.1.png'),
  loader.load('/projects/slots/images/square.red.1.png'),
]

export const createCylinderGeometry = ({ planeSize = 10 } = {}) => {
  const object3D = new THREE.Object3D()

  const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)

  const planes = textures.map((texture, ix) => {
    const planePivot = new THREE.Object3D()
    planePivot.position.set((planeSize * ix) - (planeSize * 2), +0.0, +0.0)
    planePivot.rotation.set(+0.0, +0.0, +0.0)
    object3D.add(planePivot)

    texture.magFilter = THREE.NearestFilter

    const planeMat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, })

    const mesh = new THREE.Mesh(planeGeo, planeMat)
    mesh.position.set(planeSize / 2, planeSize / 2, 0)
    planePivot.add(mesh)

    return planePivot
  })

  return object3D
}
