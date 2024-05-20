import { HTML } from '@brtmvdl/frontend'
import { HeaderComponent } from './components/header.component.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(new HeaderComponent('News API'))
  }
}
