import { HTML } from '../../../assets/js/libs/frontend/index.js'

export class ContainerComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyle('margin', '0 auto')
    this.setStyle('width', '40rem')
  }
}
