import Logger from './logger.js'

export class Scene {
  log = new Logger('Scene')

  background = new Color(0x000000)

  meshes = []

  draw({
    dom,
    ctx,
  } = {}) {
    // background
    ctx.fillStyle = this.background.toString()
    ctx.fillRect(0, 0, dom.width, dom.height)

    //
  }

  add(mesh = new Mesh) {
    this.log.info('add', { mesh })
    this.meshes.push(mesh)
  }
}

export class Position {
  x = 0
  y = 0

  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

export class Mesh {
  position = new Position(0, 0)
}

export class Rect extends Mesh {
}

export class PerspectiveCamera {
}

export class Color {
  color = 0

  constructor(color) {
    this.color = color
  }

  static rgb(r, g, b) {
    const color = new Color()
    return color.setRGB(r, g, b)
  }

  setRGB(r, g, b) {
    this.color = `rgb(${r}, ${g}, ${b})`
    //
    return this
  }

  codeToRGB() {
    const [r, g, b] = []
    //
    return [r, g, b]
  }


  toString() {
    return typeof this.color === 'string' ? this.color : '#000000'
  }
}

export class WebGLRenderer {
  log = new Logger('WebGLRenderer')

  width = 100
  height = 100

  dom = document.createElement('canvas')
  ctx = this.dom.getContext('2d')

  setSize(width, height) {
    this.log.info('setSize', { width, height })
    //
    this.dom.width = this.width = width
    this.dom.height = this.height = height
    //
    return this
  }

  render(scene = new Scene) {
    // this.log.info('render', { scene })
    //
    scene.draw({
      dom: this.dom,
      ctx: this.ctx,
    })
  }
}
