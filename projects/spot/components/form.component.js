import { HTML, nSelect, nButton } from '../../../assets/js/libs/frontend/index.js'
import { getProductList } from '../utils/lists.js'

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
    Array.from(getProductList()).map((item) => this.children.select.addOption(item, item))
    this.children.select.addEventListener('change', () => this.onSelectChange())
    this.children.select.setContainerStyle('padding', '1rem')
    this.children.select.setStyle('background-color', 'transparent')
    this.children.select.setStyle('padding', '1rem')
    this.children.select.setStyle('border', 'none')
    this.children.select.setStyle('width', '10rem')
    return this.children.select
  }

  onSelectChange() {
    this.dispatch('change', this.children.select.getValue())
  }

  getInputs() {
    return this.children.inputs
  }

  getButton() {
    const button = new nButton()
    button.setContainerStyle('padding', '1rem')
    button.setStyle('padding', '1rem')
    button.setStyle('width', '10rem')
    button.setText('start')
    button.addEventListener('click', () => this.onButtonClick())
    return button
  }

  onButtonClick() {
    this.dispatch('start', this.children.select.getValue())
  }
}
