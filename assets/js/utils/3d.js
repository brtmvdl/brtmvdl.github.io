import * as THREE from '../../../assets/js/libs/three/index.js'

import * as COLORS from './colors.js'
import * as WINDOW from './window.js'

export const radian = (r) => r * (Math.PI / +180.0)

export const createPlane = (width = +1.0, height = +1.0) => {
  const geometry = new THREE.PlaneGeometry(+width, +height)
  const material = new THREE.MeshBasicMaterial({ color: COLORS.WHITE_1, side: THREE.DoubleSide })
  const plane = new THREE.Mesh(geometry, material)
  return plane
}

export const createSphere = (radius = +1.0, segments = 5) => {
  const geometry = new THREE.SphereGeometry(radius, 2 ** segments, 2 ** (segments - 1))
  const material = new THREE.MeshBasicMaterial({ color: COLORS.WHITE_1 })
  const sphere = new THREE.Mesh(geometry, material)
  return sphere
}

export const createCylinder = (radius, height = 1, { segments = 32, color = 0x999999, openEnded = false } = {}) => {
  return new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, height, segments, 1, openEnded),
    new THREE.MeshBasicMaterial({ color }),
  )
}

export const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(+75.0, WINDOW.getAspect(), +0.1, +1e3)
  camera.lookAt(+0.0, +0.0, +0.0)
  return camera
}
