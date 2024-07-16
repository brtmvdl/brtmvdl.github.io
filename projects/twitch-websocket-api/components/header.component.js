import { HTML, nFlex, nInput, nButton } from '../../../assets/js/libs/frontend/index.js'

export class HeaderComponent extends HTML {
  children = {
    url: new nInput(),
    connect: new nButton(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getUrlInput().setContainerStyle('width', '80%'))
    flex.append(this.getConnectButton().setContainerStyle('width', '20%'))
    return flex
  }

  getUrlInput() {
    this.children.url.setContainerStyle('padding', '1rem')
    this.children.url.setStyle('padding', 'calc(1rem / 4)')
    this.children.url.setStyle('width', '100%')
    this.children.url.setPlaceholder('url')
    return this.children.url
  }

  getConnectButton() {
    this.children.connect.setContainerStyle('padding', '1rem')
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
