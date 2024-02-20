import { HTML, nFlex, nImage } from '@brtmvdl/frontend'
import { ButtonComponent } from './button.component.js'
import { LogoComponent } from './logo.component.js'

export class TopBarComponent extends HTML {
  children = { ip: new HTML() }

  getName() { return 'top-bar-component' }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getFlex())
    this.getIP()
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
    const html = new nFlex()
    html.append(this.getIpHTML())
    html.append(this.getDownloadButton())
    return html
  }

  getIpHTML() {
    this.children.ip.setStyle('padding', 'calc(1rem / 1) calc(1rem / 2)')
    return this.children.ip
  }

  getDownloadButton() {
    const button = new ButtonComponent()
    button.setText('download')
    button.on('click', () => this.dispatchEvent('download'))
    return button
  }

  getIP() {
    fetch('http://ip-api.com/json/?fields=61439').then(res => res.json())
      .then(({ query } = {}) => this.children.ip.setText(`IP: ${query}`))
      .catch((err) => console.error(err))
  }
}
