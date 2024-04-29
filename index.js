import { HTML } from '@brtmvdl/frontend'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getHeaderComponent())
    this.append(this.getHeaderComponent())
    this.append(this.getHeaderComponent())
  }

  setStyles() {
    return new HTML()
  }

  getHeaderComponent() {
    return new HTML()
  }

  getHeaderComponent() {
    return new HTML()
  }

  getHeaderComponent() {
    return new HTML()
  }
}
