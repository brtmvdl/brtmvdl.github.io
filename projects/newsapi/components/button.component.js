import { HTML, nButton } from '@brtmvdl/frontend'

export class ButtonComponent extends nButton {
  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setStyle('margin', 'calc(1rem  / 4)')
    this.setStyle('padding', '1rem')
  }
}
