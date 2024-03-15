import { CardHeaderHTML } from '../card-header.html.js'
import { CardFooterHTML } from '../card-footer.html.js'
import { CardBodyHTML } from '../card-body.html.js'
import { CardHTML } from '../card.html.js'
import { getDateNow } from '../../utils/datetime.js'

export class MessageCardHTML extends CardHTML {
  data = null

  constructor(data) {
    super()
    this.data = data
  }

  onCreate() {
    super.onCreate()
    this.setAttr('id', this.data.id)
    this.append(this.getHeaderHTML())
    this.append(this.getBodyHTML())
    this.append(this.getFooterHTML())
  }

  getHeaderHTML() {
    const header = new CardHeaderHTML()
    header.setText(this.data.method)
    return header
  }

  getBodyHTML() {
    const body = new CardBodyHTML()
    body.setText(JSON.stringify(this.data))
    return body
  }

  getFooterHTML() {
    const footer = new CardFooterHTML()
    footer.setText(getDateNow())
    return footer
  }

}

export class logMessage extends MessageCardHTML { }

export class openMessage extends MessageCardHTML { }

export class closeMessage extends MessageCardHTML { }

export class errorMessage extends MessageCardHTML { }
