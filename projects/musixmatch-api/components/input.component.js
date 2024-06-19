import * as Components from '../../../assets/js/components/input.component.js'

export class InputComponent extends Components.InputComponent {
  onCreate() {
    super.onCreate()
    this.children.label.setStyle('padding', 'calc(1rem / 4)')
    this.children.label.setStyle('margin', '0rem')
    this.children.input.setStyle('padding', 'calc(1rem / 4)')
    this.children.input.setStyle('box-sizing', 'border-box')
    this.children.input.setStyle('margin', '0rem')
    this.children.input.setStyle('width', '100%')
  }
}
