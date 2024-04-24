import { HTML, nInputTextGroup } from '@brtmvdl/frontend'

export class Page extends HTML {
  children = {
    input: new nInputTextGroup(),
  }

  onCreate() {
    this.setStyles()
    this.append(this.getInput())
  }

  setStyles() {
    this.setStyle('margin', '0 auto')
    this.setStyle('width', '10rem')
  }

  getInput() {
    this.children.input.children.label.setText('Phone Number')
    this.children.input.children.label.setStyle('margin', 'calc(1rem / 2) 0rem')
    this.children.input.children.label.setStyle('padding', 'calc(1rem / 2) 0rem')
    this.children.input.children.label.setStyle('display', 'inline-block')
    this.children.input.children.input.on('input', () => this.onInput())
    this.children.input.children.input.setAttr('maxlength', '14')
    this.children.input.children.input.setStyle('max-width', '100%')
    this.children.input.children.input.setStyle('padding', '0px')
    return this.children.input
  }

  onInput() {
    const value = this.children.input.children.input.getValue()
      .replace(/\W+/ig, '')
      .replace(/(.?.?)(.?.?.?.?)(.?.?.?.?.?)/, '($1) $2-$3')
    this.children.input.children.input.setValue(value)
    console.log('value', value, value.length)
  }
}
