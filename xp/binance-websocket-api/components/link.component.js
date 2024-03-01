import { HTML, nLink } from '@brtmvdl/frontend'

export class LinkComponent extends nLink {
  onCreate() {
    super.onCreate()

    this.setStyle('color', '#ffcc00')
  }
}
