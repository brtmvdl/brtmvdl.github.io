import * as dat from 'dat.gui'

export class Panel {
  gui = null

  constructor({ name = 'Panel' }) {
    this.gui = new dat.GUI({ name })
  }

  add(mesh, {
    name = `Mesh ${Date.now()}`
  } = {}) {
    const folder = this.gui.addFolder(name)

    folder.add(mesh, 'visible')

    folder.add(mesh.position, 'x', -10.0, +10.0, +0.1).name('pos x')
    folder.add(mesh.position, 'y', -10.0, +10.0, +0.1).name('pos y')
    folder.add(mesh.position, 'z', -10.0, +10.0, +0.1).name('pos z')

    folder.add(mesh.rotation, 'x', -Math.PI * 2, +Math.PI * 2, +Math.PI / 10).name('rot x')
    folder.add(mesh.rotation, 'y', -Math.PI * 2, +Math.PI * 2, +Math.PI / 10).name('rot y')
    folder.add(mesh.rotation, 'z', -Math.PI * 2, +Math.PI * 2, +Math.PI / 10).name('rot z')

    return folder
  }

  addLight(light, {
    name = `Light ${Date.now()}`
  } = {}) {
    const folder = this.gui.addFolder(name)

    // folder.add(light, 'visible', [min], [max], [step])

    folder.add(light, 'visible')
    folder.add(light, 'intensity', +0.0, +1.0, +0.1)
    folder.addColor(light, 'color')

    return folder

  }
}
