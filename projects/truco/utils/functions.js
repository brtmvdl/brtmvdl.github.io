import * as THREE from '../../../assets/js/libs/three/index.js'

import * as COLORS from '../../../assets/js/utils/colors.js'

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

export const radian = (r) => r * (Math.PI / 180)
