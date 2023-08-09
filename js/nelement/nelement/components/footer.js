import { nElement } from '../index.js'

export class FooterComponent extends nElement {
  getName() {
    return 'footer'
  }

  onCreate() {
    this.setText('footer')
  }
}
