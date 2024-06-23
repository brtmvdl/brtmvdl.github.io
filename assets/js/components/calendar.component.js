import { HTML, nFlex } from '@brtmvdl/frontend'
import {} from '../../../assets/js/utils/functions.js'

export class CalendarComponent extends HTML {
  children = {
    year: new SelectComponent(),
    month: new SelectComponent(),
    days: new HTML(),
  }

  state = {
    current_date: new Date(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getChangeButton())
  }

  getChangeButton() {
    const html = new HTML()
    html.append(this.getYearMonthHTML())
    html.append(this.getDaysHTML())
    return html
  }

  getYearMonthHTML() {
    const flex = new nFlex()
    flex.append(this.getYearSelect())
    flex.append(this.getMonthSelect())
    return flex
  }

  getYearSelect() {
    Array.from(Array(5)).map((i) => this.children.year.addOption(i, i))
    return this.children.year
  }

  getMonthSelect() {
    Array.from(Array(12))
      .map((_, i) => {
        const date = new Date()
        date.setMonth(date.getMonth() + i)
        return monthName(date.getMonth() + 1)
      })
      .map((i) => this.children.month.addOption(i, i))
    return this.children.month
  }

  getDaysHTML() {
    return this.children.days
  }
}
