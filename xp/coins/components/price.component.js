import { HTML } from '@brtmvdl/frontend'

export class PriceComponent extends HTML {
  update(price) {
    this.setText(price)
  }
}
