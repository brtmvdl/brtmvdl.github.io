import { HTML, nButton } from '@brtmvdl/frontend'
import { SelectComponent } from './select.component.js'

export class TabComponent extends HTML {
  children = {
    select: new SelectComponent(),
    inputs: new HTML(),
    button: new nButton(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getSelect())
    this.append(this.getInputs())
    this.append(this.getButton())
  }

  getSelect() {
    Array.from(this.getOptions()).map((option) => this.children.select.addOption(option, option))
    return this.children.select
  }

  getOptions() {
    return []
  }

  getInputs() {
    return this.children.inputs
  }

  getButton() {
    this.children.button.setText('send')
    this.children.button.on('click', () => this.onButtonClick())
    return this.children.button
  }

  onButtonClick() {
    console.log('onSendButton', this.children.select.getValue())
  }
}
