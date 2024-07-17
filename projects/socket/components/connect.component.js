import { HTML, nFlex, nInput, nButton } from '../../../assets/js/libs/frontend/index.js'
import { TwoColumnsComponent } from '../../../assets/js/components/two.columns.component.js'

export class ConnectComponent extends HTML {
  children = {
    url: new nInput(),
    connect: new nButton(),
  }

  onCreate() {
    super.onCreate()
    this.append(new TwoColumnsComponent({
      html1: this.getUrlInput(),
      html2: this.getConnectButton(),
      widths: ['78%', '20%']
    }))
  }

  getUrlInput() {
    this.children.url.setStyle('padding', 'calc(1rem / 4)')
    this.children.url.setStyle('width', '100%')
    this.children.url.setPlaceholder('url')
    return this.children.url
  }

  getConnectButton() {
    this.children.connect.setStyle('padding', 'calc(1rem / 4)')
    this.children.connect.setStyle('width', '100%')
    this.children.connect.setText('connect')
    this.children.connect.addEventListener('click', () => this.onConnectButtonClick())
    return this.children.connect
  }

  onConnectButtonClick() {
    this.dispatch('connect', this.children.url.getValue())
  }
}
