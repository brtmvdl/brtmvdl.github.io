import { HTML } from '@brtmvdl/frontend'

import { Logger } from '../utils/logger.js'

import { Unique } from './unique.js'
import { Yearly } from './yearly.js'

export class ProjectFooter extends HTML {
  logger = new Logger('Project Footer')

  state = {
    unique: 0,
    yearly: 0,
  }

  children = {
    unique: new Unique(),
    yearly: new Yearly()
  }

  onCreate() {
    this.setStyles()
    this.append(this.getUnique())
    this.append(this.getYearly())
  }

  setStyles() {
    this.setStyle('padding', '1rem')
    this.setStyle('border-top', 'calc(1rem / 8) solid #000000')
  }

  getUnique() {
    return this.children.unique
  }

  getYearly() {
    return this.children.yearly
  }

  getPriceText(price = 0, coin = 'R$') {
    this.logger.log('getPriceText', { price, coin })

    return `${coin} ${price.toFixed(2).replace('.', ',')}`
  }

  setUnique(unique = 0) {
    this.children.unique.children.value.setText(this.getPriceText(unique))
    return this
  }

  setYearly(yearly = 0) {
    this.children.yearly.children.value.setText(this.getPriceText(yearly))
    return this
  }
}
