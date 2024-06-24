import { HTML, nInput } from '@brtmvdl/frontend'

export class DateTimeGroupComponent extends nInput {
  constructor(text, value = Date.now()) {
    super(text, value, 'datetime-local')
  }

  getName() { return 'date-time-group-component' }

  getValue() {
    const datetime = super.getValue()
    const date = new Date(datetime)
    return date.getTime()
  }
}
