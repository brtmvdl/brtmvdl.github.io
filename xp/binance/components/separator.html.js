import { HTML } from '@brtmvdl/frontend'

export class SeparatorHTML extends HTML {
  onCreate() {
    super.onCreate()
    this.setContainerStyle('background-color', '#000000')
    this.setContainerStyle('display', 'inline-block')
    this.setContainerStyle('height', '100vh')
    this.setContainerStyle('width', '2rem')
  }
}
