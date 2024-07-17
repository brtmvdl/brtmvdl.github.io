import * as THREE from '../../../assets/js/libs/three/index.js'
import * as COLORS from '../../../assets/js/utils/colors.js'
import { createPlane, radian } from '../utils/functions.js'

const params = {
  positions: [
    [+4.0, +0.5, +0.0],
    [+0.0, +0.5, +4.0],
    [-4.0, +0.5, +0.0],
    [+0.0, +0.5, -4.0],
  ]
}

export class PlayerModel {
  sphere = null
  cards = []

  mesh = new THREE.Group()
  conn = null

  constructor(pos) {
    this.sphere = this.createSphere(pos)
    this.cards.push(this.createPlane(0, pos))
    this.cards.push(this.createPlane(1, pos))
    this.cards.push(this.createPlane(2, pos))
    this.setMesh(pos)
  }

  setMesh(pos) {
    this.mesh.position.set(...(params.positions[pos]))
    this.mesh.rotation.set(radian(90), +0.0, radian((pos + 1) * 90))
    this.mesh.add(this.sphere)
    Array.from(this.cards).map((card) => this.mesh.add(card))
  }

  createSphere(pos) {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(+0.1),
      new THREE.MeshBasicMaterial({
        color: COLORS.YELLOW_1,
      }),
    )

    return sphere
  }

  createPlane(rot, pos) {
    const plane = createPlane(+0.2, +0.5)

    plane.position.set((rot - +1.0) * +0.25, +0.5, +0.25)

    return plane
  }

  getConnection() {
    return this.conn
  }

  setConnection(conn) {
    console.log('conn', { conn })

    conn.on('open', (open) => {
      console.log('conn open', { conn, open })

      this.sphere.material.color = new THREE.Color(COLORS.WHITE_1)
    })

    conn.on('close', (close) => {
      console.log('conn close', { conn, close })
    })

    conn.on('error', (error) => {
      console.log('conn error', { conn, error })
    })

    conn.on('data', (data) => {
      console.log('conn data', { conn, data })
    })

    this.conn = conn
  }

}
