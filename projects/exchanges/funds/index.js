import { HTML, nInputTextGroup, nButton, nFlex } from '@brtmvdl/frontend'
import { TopBar } from '../components/topbar.js'
import { FundModel } from '../models/fund.js'
import * as Local from '../utils/local.js'
import * as COLORS from '../colors.js'

export class Page extends HTML {
  children = {
    fund: new nInputTextGroup(),
  }

  onCreate() {
    this.append(new TopBar())
    this.append(this.getForm())
  }

  getForm() {
    const form = new HTML()
    form.setStyle('margin', '0 auto')
    form.setStyle('width', '40rem')
    form.append(this.getInput())
    const flex = new nFlex()
    flex.append(this.getButton('subtract funds', -1))
    flex.append(this.getButton('add funds', +1))
    form.append(flex)
    return form
  }

  getInput() {
    this.children.fund.children.label.setText('Funds')

    this.children.fund.children.input.setStyle('width', '100%')
    this.children.fund.children.input.setStyle('border', 'none')
    this.children.fund.children.input.setStyle('margin-bottom', '1rem')
    this.children.fund.children.input.setStyle('box-sizing', 'border-box')
    this.children.fund.children.input.setStyle('padding', 'calc(1rem / 4)')
    this.children.fund.children.input.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')

    return this.children.fund
  }

  getButton(title, multiply = 1) {
    const button = new nButton()
    button.setText(title)
    button.setStyle('background-color', COLORS.BLACK_1)
    button.setStyle('padding', 'calc(1rem / 2)')
    button.setStyle('color', COLORS.WHITE_1)
    button.setStyle('border', '1rem')
    button.on('click', () => {
      const fund = new FundModel()
      fund.setValue(+this.children.fund.children.input.getValue() * multiply)
      Local.add(['history'], fund)
    })
    return button
  }
}
