import { HTML } from '../../../assets/js/libs/frontend/index.js'
import { padLeft, secondsToMinutes } from '../../../assets/js/utils/str.js'

export class ChallengeListComponent extends HTML {
  item = null

  children = {
    title: new HTML(),
    level: new HTML(),
    total: new HTML(),
  }

  constructor(item = {}) {
    super()
    this.item = item
  }

  onCreate() {
    this.setStyles()
    this.setEvents()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new HTML()

    flex.append(this.getTitle())
    flex.append(this.getLevel())
    flex.append(this.getTotal())

    flex.setStyle('padding', '1rem')
    // flex.setStyle('border-radius', 'calc(1rem / 4)')
    flex.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')

    return flex
  }

  setStyles() {
    this.setStyle('margin-bottom', '1rem')
  }

  setEvents() {
    this.addEventListener('click', () => FLOW.goTo('./challenge/index.html', { id: this.item.id }))
  }

  getTitle() {
    this.children.title.setText(this.item.title)

    this.children.title.setStyle('margin-bottom', 'calc(1rem / 4)')

    return this.children.title
  }

  parseDateString(datetime) {
    const date = new Date(datetime)
    const month = parseMonth(date.getMonth() + 1)
    const day = padLeft(date.getDate(), 2, '0')
    return [month, day].join(' ')
  }

  getLevel() {
    this.children.level.setText(`Level: ${this.item.level}`)

    this.children.level.setStyle('margin-bottom', 'calc(1rem / 4)')

    return this.children.level
  }

  getTotal() {
    const { workouts } = this.item

    const [t, w] = workouts.reduce(([time, workout], w) => ([time + w.time, workout + (w.workouts || 0)]), [0, 0])

    this.children.total.setText([`${secondsToMinutes(t)} min`, `${w} workouts`,].join(' - '))

    return this.children.total
  }

}
