import { HTML } from '@brtmvdl/frontend'
import { HeaderComponent } from './header.component.js'

export class PaddingComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyle('padding', 'calc(1rem / 4)')
    this.setStyle('margin', '0 auto')
    this.append(new HeaderComponent())
  }
}
