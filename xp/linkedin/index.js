import { HTML, nButton } from '@brtmvdl/frontend'
import * as API from './api.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.setText('Share on LinkedIn API')
  }
}
