import { HTML, nInputTextGroup } from '@brtmvdl/frontend'

export class InputTextGroupComponent extends nInputTextGroup {
  text = ''
  value = ''
  type = ''

  constructor(text = '', value = '', type = 'text') {
    super()
    this.text = text
    this.value = value
    this.type = type
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.children.label.setText(this.text)
    this.children.input.setValue(this.value)
    this.children.input.setAttr('type', this.type)
  }

  setStyles() {
    this.children.input.setStyle('background-color', 'rgba(0, 0, 0, 0)')
    // this.children.input.setStyle('border-radius', 'calc(1rem / 2)')
    this.children.input.setStyle('padding', 'calc(1rem / 2) 0rem')
    this.children.input.setStyle('margin', 'calc(1rem / 2) 0rem')
    this.children.input.setStyle('border', '#000000 solid 1px')
    this.children.input.setStyle('box-sizing', 'border-box')
    this.children.input.setStyle('cursor', 'pointer')
    this.children.input.setStyle('color', '#000000')
    this.children.input.setStyle('font', 'inherit')
    this.children.input.setStyle('width', '100%')
  }
}
