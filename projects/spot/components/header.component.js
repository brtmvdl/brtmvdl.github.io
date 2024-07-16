import { HTML, nFlex, nLink, nImage } from '../../../assets/js/libs/frontend/index.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'
import { ip } from '../../../assets/js/utils/net.js'

export class HeaderComponent extends HTML {
  children = {
    ip: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
    this.getIp()
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getLeft())
    flex.append(this.getRight())
    return flex
  }

  getLeft() {
    const left = new HTML()
    left.setStyle('padding', '1rem')
    left.append(this.getLogoImageLink())
    return left
  }

  getLogoImageLink() {
    const link = new nLink()
    link.href('https://www.bitget.com/api-doc/common/websocket-intro')
    link.append(new TextComponent({ text: 'Bitget Websocket API - Spot' }))
    return link
  }

  getRight() {
    const right = new HTML()
    right.append(this.getIpHTML())
    return right
  }

  getIpHTML() {
    this.children.ip.setStyle('padding', '1rem')
    return this.children.ip
  }

  getIp() {
    ip().then((res) => this.children.ip.setText(res.ip))
  }
}
