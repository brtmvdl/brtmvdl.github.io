import { HTML } from '@brtmvdl/frontend'
import { TextComponent } from './text.component.js'

export class TitleComponent extends TextComponent {
  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setStyle('', '')
  }
}
