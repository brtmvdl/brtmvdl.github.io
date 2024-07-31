import { HTML } from '../../../assets/js/libs/frontend/index.js'
import { ImageComponent } from './image.component.js'
import { LinkComponent } from './link.component.js'
import { stepName } from '../utils/functions.js'

export class ProjectThumbnailComponent extends HTML {
  state = { id: null, tags: null, step: null, }

  constructor({ id, tags, step } = {}) {
    super()
    this.state.id = id
    this.state.tags = tags
    this.state.step = step
  }

  onCreate() {
    super.onCreate()
    this.append(this.getImage())
    this.append(this.getTitle())
  }

  getUrl(path) {
    const url = new URL(window.location)
    url.pathname = `/projects/${this.state.id}/${path}`
    url.search = ''
    return url.toString()
  }

  getImage() {
    const image = new ImageComponent({ src: this.getUrl('image.jpg') })
    image.setStyle('max-width', '26rem')
    return image
  }

  getTitle() {
    const text = `${this.state.id} (${stepName(this.state.step)})`
    return new LinkComponent({ href: this.getUrl('index.html'), text })
  }
}
