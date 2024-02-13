import { HTML, nSelect } from '@brtmvdl/frontend'

export class CoinsSelect extends nSelect {
  onCreate() {
    this.setContainerStyle('text-align', 'center')
    this.setStyle('background-color', '#ffffff')
    this.setStyle('padding', 'calc(1rem / 2)')
    this.setStyle('font-famliy', 'inherit')
    this.setStyle('text-align', 'center')
    this.setStyle('font-size', '2rem')
    this.setStyle('border', 'none')
  }
}
