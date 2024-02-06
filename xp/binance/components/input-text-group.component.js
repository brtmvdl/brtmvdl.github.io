import { HTML, nInputTextGroup } from '@brtmvdl/frontend'

export class InputTextGroupComponent extends nInputTextGroup {
  text = ''
  value = ''

  constructor(text = '', value = '') {
    super()
    this.text = text
    this.value = value
  }

  onCreate() {
    super.onCreate()
    this.children.label.setText(this.text)
    this.children.input.setValue(this.value)
    this.children.input.setStyle('border', '#000000 solid 1px')
    this.children.input.setStyle('background-color', 'rgba(0, 0, 0, 0)')
    this.children.input.setStyle('margin', 'calc(1rem / 2) 0rem')
    this.children.input.setStyle('color', '#000000')
    this.children.input.setStyle('box-sizing', 'border-box')
    this.children.input.setStyle('border-radius', '6px')
    this.children.input.setStyle('font', 'inherit')
  }
}
