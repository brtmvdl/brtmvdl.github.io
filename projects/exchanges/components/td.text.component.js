import { TdComponent } from './td.component.js'

import { TextComponent } from '../../../assets/js/components/text.component.js'

export class TdTextComponent extends TdComponent {
  constructor(text = '') {
    super(new TextComponent(text))
  }
}
