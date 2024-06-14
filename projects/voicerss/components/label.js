import { HTML } from '@brtmvdl/frontend'

export class nLabel extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setStyle('margin', 'calc(1rem / 4)')
  }
}
