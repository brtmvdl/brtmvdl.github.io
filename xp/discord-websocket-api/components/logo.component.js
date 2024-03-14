import { HTML, nImage } from '@brtmvdl/frontend'

export class LogoComponent extends nImage {
  onCreate() {
    super.onCreate()
    this.src('./logo.png')
    this.setStyle('max-height', '3rem')
  }
}
