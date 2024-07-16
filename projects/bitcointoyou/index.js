import { HTML } from '../../assets/js/libs/frontend/index.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.setText('https://apidoc.bitcointoyou.com/')
  }
}
