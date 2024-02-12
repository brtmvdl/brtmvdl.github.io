import { HTML } from '@brtmvdl/frontend'
import * as UTILS from './../utils/str.js'

export class DatetimeHTML extends HTML {
  state = {
    datetime: 0,
  }

  children = {
    text: new HTML(),
  }

  onCreate() {
    this.append(this.getText())
  }

  getText() {
    this.children.text.setStyle('padding', '1rem 0rem')
    this.children.text.setStyle('text-align', 'center')

    return this.children.text
  }

  getDatetimeText(now = Date.now()) {
    const datetime = new Date(now)

    const date = [
      datetime.getFullYear(),
      datetime.getMonth() + 1,
      datetime.getDay(),
    ].map((num) => UTILS.padLeft(num, 2, '0')).join('-')

    const time = [
      datetime.getHours(),
      datetime.getMinutes(),
      datetime.getSeconds(),
    ].map((num) => UTILS.padLeft(num, 2, '0')).join(':')

    return [date, time].join(' ')
  }

  updateDatetime() {
    this.children.text.setText(this.getDatetimeText(
      this.state.datetime = Date.now()
    ))
  }
}
