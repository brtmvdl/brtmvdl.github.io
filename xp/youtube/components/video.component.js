import { HTML } from '@brtmvdl/frontend'

export class VideoComponent extends HTML {
  model = {}

  constructor(model = {}) {
    super()
    this.model = model
  }

  onCreate() {
    super.onCreate()
    this.append(this.getIdHTML())
  }

  getIdHTML() {
    const html = new HTML()
    html.setText(this.model.id)
    return html
  }
}
