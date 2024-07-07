import * as THREE from 'three'

export class CylinderGeometry extends THREE.CylinderGeometry {
  images = Array.from(Array(8)).map(() => +0.0)

  constructor(images = [], { radiusTop = +1.0, radiusBottom = +1.0, height = +1.0, radialSegments = +8.0, heightSegments = +1.0, openEnded = true, } = {}) {
    super(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded)

    console.log('cylinder geometry', { images, radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded })

    Array.from(images).map((image, ix) => this.setImage(ix, image))
  }

  setImage(index, image) {
    console.log('setImage', { index, image })
  }
}
