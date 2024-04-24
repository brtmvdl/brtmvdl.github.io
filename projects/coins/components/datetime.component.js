import { HTML } from '@brtmvdl/frontend'
import { datetime2str } from '../../../assets/js/utils/str.js'

export class DatetimeComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setContainerStyle('text-align', 'center')
    this.setStyle('padding', '1rem')
  }

  update() {
    this.setText(datetime2str())
  }
}
