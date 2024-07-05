import * as THREE from 'three'
import * as COLORS from '../../../assets/js/utils/colors.js'

const params = {
  positions: [
    [+5.0, +0.5, +0.0],
    [-5.0, +0.5, +0.0],
    [+0.0, +0.5, +5.0],
    [+0.0, +0.5, -5.0],
  ]
}

export class PlayerModel {
  sphere = null
  cards = []

  mesh = new THREE.Group()

  constructor(pos) {
    const sphere = this.createSphere(pos)
    const cards1 = this.createPlane(0, pos)
    const cards2 = this.createPlane(1, pos)
    const cards3 = this.createPlane(2, pos)

    this.sphere = sphere
    this.cards.push(cards1)
    this.cards.push(cards2)
    this.cards.push(cards3)

    this.mesh.add(sphere)
    this.mesh.add(cards1)
    this.mesh.add(cards2)
    this.mesh.add(cards3)

    this.mesh.position.set(...(params.positions[pos]))
  }

  createSphere(position) {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(+0.1),
      new THREE.MeshBasicMaterial({ color: COLORS.YELLOW_1 }),
    )
    return sphere
  }

  createPlane(rot, pos) {
    console.log('create plane', { rot, pos })
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(+2.0, +5.0),
      new THREE.MeshBasicMaterial({ color: COLORS.WHITE_1, side: THREE.DoubleSide }),
    )
    return plane
  }
}
