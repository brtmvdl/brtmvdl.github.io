import { HTML } from '../../assets/js/libs/frontend/index.js'
import { InputComponent } from '../../assets/js/components/input.component.js'

export class Page extends HTML {
  children = {
    input: new InputComponent('Phone Number'),
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
    this.children.input.children.input.addEventListener('input', () => this.onInput())
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
