import { HTML, nInput, nButton } from '@brtmvdl/frontend'

export class Page extends HTML {
  onCreate() {
    this.setText('page ' + Date.now())
  }
}
