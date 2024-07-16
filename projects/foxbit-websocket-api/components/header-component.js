import { HTML } from '../../../assets/js/libs/frontend/index.js'
import { LinkComponent } from '../../../assets/js/components/link.component.js'
import { ImageComponent } from '../../../assets/js/components/image.component.js'
import { TwoColumnsComponent } from '../../../assets/js/components/two.columns.component.js'

export class HeaderComponent extends HTML {
  getName() { return 'header-component' }

  state = { link: '', }

  constructor({ link = '' } = {}) {
    super()
    this.state.link = link
  }

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    return new TwoColumnsComponent({ html1: this.getLogoLink(), })
  }

  getLogoLink() {
    const link = new LinkComponent({ href: this.state.link })
    link.append(this.getImage())
    return link
  }

  getImage() {
    const image = new ImageComponent({ src: './logo.png' })
    image.setStyle('height', '2rem')
    image.setStyle('margin', '1rem')
    return image
  }
}
