import { TextHTML } from './text.html.js'

export class PriceHTML extends TextHTML {
  onCreate() {
    super.onCreate()
    this.setContainerStyle('text-align', 'center')

    this.setStyle('font-size', 'calc(3rem / 2)')
    this.setStyle('background-color', '#ffffff')
    this.setStyle('padding', 'calc(1rem / 2)')
    this.setStyle('text-align', 'center')
    this.setStyle('border', 'none')

  }
}
