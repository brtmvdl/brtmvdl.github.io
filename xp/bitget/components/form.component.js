import { HTML, nSelect, nButton } from '@brtmvdl/frontend'
import { getEndpointList } from '../utils/lists.js'

export class FormComponent extends HTML {
  children = {
    select: new nSelect(),
    inputs: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getSelect())
    this.append(this.getInputs())
    this.append(this.getButton())
  }

  getSelect() {
    Array.from(getEndpointList()).map((item) => this.children.select.addOption(item, item))
    this.children.select.on('change', () => this.onSelectChange())
    return this.children.select
  }

  onSelectChange() {
    console.log('change')
  }

  getInputs() {
    return this.children.inputs
  }

  getButton() {
    const button = new nButton()
    button.setText('send')
    button.on('click', () => this.onButtonClick())
    return button
  }

  onButtonClick() {
    console.log('click')
  }
}
