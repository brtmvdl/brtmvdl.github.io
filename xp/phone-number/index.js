import { HTML, nInput } from '@brtmvdl/frontend'

export class Page extends HTML {

  onCreate() {
    const input = new nInput()
    input.on('input', () => input.setValue(input.getValue().replace(/\W+/ig, '').replace(/(.?.?)(.?.?.?.?)(.?.?.?.?.?)/, '($1) $2-$3')))
    this.append(input)
  }
}
