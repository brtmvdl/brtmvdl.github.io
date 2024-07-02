import { HTML } from '@brtmvdl/frontend'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'

export class Page extends PaddingComponent {
  onCreate() {
    super.onCreate()
    this.setText('panel')
  }
}
