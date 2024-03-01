import { InputTextGroupComponent } from './input-text-group.component.js'

export class DateTimeGroupComponent extends InputTextGroupComponent {
  constructor(text, value = Date.now()) {
    super(text, value, 'datetime-local')
  }

  getValue() {
    const datetime = super.getValue()
    const date = new Date(datetime)
    return date.getTime()
  }
}
