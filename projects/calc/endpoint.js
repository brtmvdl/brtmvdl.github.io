import { nElement, nFlex, nInputNumber, nInputText } from '../../js/nelement/index.js'

export class EndPoint extends nElement {
  children = {
    path: new nInputText(),
    hours: new nInputNumber(),
  }

  onCreate() {
    const flex = new nFlex()
    flex.append(this.getPath())
    flex.append(this.getHours())
    this.append(flex)
  }

  getPath() {
    this.children.path.setPlaceholder('/home')
    this.children.path.setStyle('width', '80%')
    this.children.path.setStyle('border', 'none')
    this.children.path.setStyle('padding', 'calc(1rem / 2)')
    this.children.path.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')

    this.children.path.setContainerStyle('width', '100%')
    this.children.path.on('input', ({ value }) => this.dispatchEvent('input', value))

    return this.children.path
  }

  getHours() {
    this.children.hours.setPlaceholder('1')
    this.children.hours.setStyle('width', '80%')
    this.children.hours.setStyle('border', 'none')
    this.children.hours.setStyle('text-align', 'right')
    this.children.hours.setStyle('padding', 'calc(1rem / 2)')
    this.children.hours.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')

    return this.children.hours
  }
}
