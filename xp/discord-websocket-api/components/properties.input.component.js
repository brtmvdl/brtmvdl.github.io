import { InputTextGroupComponent } from './input-text-group.component.js'

export class PropertiesInputComponent extends InputTextGroupComponent {
  onCreate() {
    super.onCreate()
    this.children.label.setText('Properties')
    this.children.input.setAttr('disabled', true)
  }

  getValue() {
    return { os: 'linux', browser: 'disco', device: 'disco' }
  }
}
