import { HTML } from '../index.js'

export class FooterComponent extends HTML {
  getName() {
    return 'footer'
  }

  onCreate() {
    this.setText('footer')
  }
}
