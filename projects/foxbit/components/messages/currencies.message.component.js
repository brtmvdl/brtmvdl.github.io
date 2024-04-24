import { HTML } from '@brtmvdl/frontend'
import { MessageComponent } from './message.component.js'
import { TextComponent } from '../text.component.js'

export class CurrenciesMessageComponent extends MessageComponent {
  getRequestHTML() {
    console.log(this.data.request)
    return new TextComponent('')
  }

  getResponseHTML() {
    console.log(this.data.response.data)
    const data = this.data.response.data.map(({
      name,
      precision,
      category,
      symbol,
      type,
      deposit_info,
      withdraw_info,
    } = {}) => ({
      name,
      precision,
      category: `${category?.name ? category?.name : ''} ${category?.code ? category?.code : ''}`,
      symbol,
      type,
      deposit_min_to_confirm: deposit_info?.min_to_confirm,
      deposit_min_amount: deposit_info?.min_amount,
      withdraw_enabled: withdraw_info?.enabled,
      withdraw_min_amount: withdraw_info?.min_amount,
      withdraw_fee: withdraw_info?.fee,
    }))
    return this.getTableHTML(data)
  }
}
