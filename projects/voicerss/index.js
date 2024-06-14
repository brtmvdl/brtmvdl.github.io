import { HTML } from '@brtmvdl/frontend'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    
    this.setText('https://voicerss.org/')
  }
}
