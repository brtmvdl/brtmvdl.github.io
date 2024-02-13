import { HTML, nSelect } from '@brtmvdl/frontend'

export class PairsSelectComponent extends nSelect {
  onCreate() {
    super.onCreate()
    this.setContainerStyle('text-align', 'center')
    this.setStyle('background-color', '#ffffff')
    this.setStyle('padding', 'calc(1rem / 2)')
    this.setStyle('text-align', 'center')
    this.setStyle('font-size', '2rem')
    this.setStyle('border', 'none')
  }
}
