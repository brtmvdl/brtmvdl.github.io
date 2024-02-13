import { TextHTML } from './text.html.js'

export class TitleHTML extends TextHTML {
  onCreate() {
    super.onCreate()
    this.setStyle('background-color', '#000000')
    this.setStyle('padding', 'calc(1rem / 2)')
    this.setStyle('color', '#ffffff')
  }
}
