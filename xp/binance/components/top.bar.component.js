import { HTML, nFlex, nImage } from '@brtmvdl/frontend'
import { ButtonComponent } from './button.component.js'
import { LogoComponent } from './logo.component.js'

export class TopBarComponent extends HTML {
  children = {}

  state = {}

  getName() { return 'top-bar-component' }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getFlex())
  }

  setStyles() {
    this.setStyle('padding', '1rem 1rem 0rem 1rem')
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getLeft())
    flex.append(this.getRight())
    return flex
  }

  getLeft() {
    const html = new HTML()
    html.append(new LogoComponent())
    return html
  }

  getRight() {
    const button = new ButtonComponent()
    button.setText('download')
    button.on('click', () => this.dispatchEvent('download'))
    return button
  }
}
