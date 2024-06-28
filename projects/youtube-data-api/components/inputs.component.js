import { InputComponent } from '../../../assets/js/components/input.component.js'
import * as Components from '../../../assets/js/components/inputs.component.js'

export class InputsComponent extends Components.InputsComponent {
  children = {
    part: new InputComponent('part', 'id'),
    chart: new InputComponent('chart', 'mostPopular'),
  }
}
