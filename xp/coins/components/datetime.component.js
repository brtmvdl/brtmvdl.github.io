import { HTML } from '@brtmvdl/frontend'
import { datetime2str } from '../../../assets/js/utils/str.js'

export class DatetimeComponent extends HTML {
  update() {
    this.setText(datetime2str())
  }
}
