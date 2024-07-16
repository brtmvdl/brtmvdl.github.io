import { HTML } from '../../assets/js/libs/frontend/index.js'
import { HeaderComponent } from '../../assets/js/components/header.component.js'
import { FooterComponent } from '../../assets/js/components/footer.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { CalendarComponent } from '../../assets/js/components/calendar.component.js'

export class Page extends HTML {
  children = {
    event_type: new HTML(),
    calendar: new CalendarComponent(),
    payment_buttons: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(new HeaderComponent())
    this.append(this.getBody())
    this.append(new FooterComponent())
  }

  getBody() {
    const html = new HTML()
    html.append(this.getEventTypeHTML())
    html.append(this.getCalendarHTML())
    html.append(this.getPaymentButtons())
    return html
  }

  getEventTypeHTML() {
    this.children.event_type.append(this.getCreateMeetingEventButton())
    return this.children.event_type
  }

  getCreateMeetingEventButton() {
    return new ButtonComponent({ text: 'Meeting', onclick: () => this.onCreateMeetingEventButtonClick() })
  }

  onCreateMeetingEventButtonClick() {
    this.children.event_type.setStyle('display', 'none')
    this.children.calendar.setStyle('display', 'block')
  }

  getCalendarHTML() {
    this.children.calendar.setStyle('display', 'none')
    this.children.calendar.addEventListener('change', ({ value }) => this.onCalendarChange({ value }))
    return this.children.calendar
  }

  onCalendarChange({ value } = {}) {
    console.log('on Calendar Change', { value })
  }

  getPaymentButtons() {
    this.children.payment_buttons.setStyle('display', 'none')
    return this.children.payment_buttons
  }
}
