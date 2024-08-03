import { HTML, nFlex } from '../../../assets/js/libs/frontend/index.js'
import { SelectComponent } from '../../../assets/js/components/select.component.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import { monthName } from '../../../assets/js/utils/calendar.js'
import { padLeft } from '../../../assets/js/utils/str.js'

export class CalendarComponent extends HTML {
  children = {
    year: new SelectComponent(),
    month: new SelectComponent(),
    days: new HTML(),
  }

  state = {
    cur_date: new Date(),
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(this.getChangeButton())
    this.loadDays()
  }

  setEvents() {
    this.addEventListener('updatemonth', () => this.loadDays())
    this.addEventListener('updateyear', () => this.loadDays())
  }

  loadDays() {
    this.children.days.clear()
    const days = this.getDaysOfMonth(this.getYear(), this.getMonth())
    Array.from(days).map((day) => this.children.days.append(this.getDateButton(day)))
  }

  getDateButton(date = new Date()) {
    const day = padLeft(date.getDate(), 2, '0')
    const button = new ButtonComponent({ text: day, onclick: () => this.onDateChange(date) })
    if (date < this.state.cur_date) button.setAttr('disabled', true)
    return button
  }

  onDateChange(date = new Date()) {
    console.log('on date change', { date })
  }

  getDaysOfMonth(year, month) {
    return Array.from(Array(31))
      .map((_, day) => new Date(+year, +month - 1, +day + 1))
      .filter((date, day) => (day + 1).toString() == date.getDate().toString())
  }

  getYear() {
    return this.children.year.getValue().toString()
  }

  getMonth() {
    return padLeft(this.children.month.getValue(), 2, '0').toString()
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
    const year = +(this.state.cur_date).getFullYear()
    Array.from(Array(5))
      .map((_, i) => (year + i).toString())
      .map((i) => this.children.year.addOption(i, i))
    this.children.year.addEventListener('change', () => this.dispatch('updateyear'))
    return this.children.year
  }

  getMonthSelect() {
    Array.from(Array(12))
      .map((_, i) => monthName(i + 1))
      .map((month, i) => this.children.month.addOption(i + 1, month))
    this.children.month.addEventListener('change', () => this.dispatch('updatemonth'))
    return this.children.month
  }

  getDaysHTML() {
    return this.children.days
  }
}
