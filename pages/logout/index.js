import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import * as LOCAL from '../../assets/js/utils/local.js'
import * as FLOW from '../../assets/js/utils/flow.js'

export class Page extends PaddingComponent {
  onCreate() {
    super.onCreate()
    LOCAL.set(['access_token'], null)
    FLOW.goTo('/?access_token=0')
  }
}
