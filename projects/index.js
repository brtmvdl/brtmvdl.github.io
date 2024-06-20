import { HTML } from '@brtmvdl/frontend'
import { HeaderComponent } from '../assets/js/components/header.component.js'
import { FooterComponent } from '../assets/js/components/footer.component.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(new HeaderComponent())
    this.append(this.getBody())
    this.append(new FooterComponent())
  }

  getBody() {
    return new HTML()
  }

}
