import { HTML, nInputTextGroup, nLabel, nError, nFlex, nInputText } from '@brtmvdl/frontend'

export class DateTimeGroupComponent extends nInputTextGroup {
  state = {
    label: '',
    value: [],
  }

  children = {
    label: this.getLabel(),
    // input: this.getInput(),
    error: new nError(),
    //
    year: new nInputText(),
    month: new nInputText(),
    day: new nInputText(),
    hour: new nInputText(),
    minute: new nInputText(),
    second: new nInputText(),
  }

  constructor(label, value = Date.now()) {
    super()
    this.state.label = label
    const date = new Date(value)
    this.state.value = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ]
  }

  getLabel() {
    const label = new nLabel()
    label.setText(this.state.label)
    return label
  }

  getInput() {
    const flex = new nFlex()
    flex.setStyle('width', '15rem')
    Array.from([
      this.children.year,
      this.children.month,
      this.children.day,
      this.children.hour,
      this.children.minute,
      this.children.second,
    ]).map((input, ix) => {
      input.setStyle('background-color', 'rgba(0, 0, 0, 0)')
      input.setStyle('width', ix === 0 ? '3rem' : '2rem')
      input.setStyle('border-radius', 'calc(1rem / 2)')
      input.setStyle('margin', 'calc(1rem / 2) 0rem')
      input.setStyle('border', '#000000 solid 1px')
      input.setStyle('box-sizing', 'border-box')
      input.setStyle('text-align', 'center')
      input.setStyle('color', '#000000')
      input.setStyle('font', 'inherit')
      flex.append(input)
    })
    return flex
  }

  getValue() {
    const [year, month, day, hour, minute, second] = Array.from([
      this.children.year, this.children.month, this.children.day,
      this.children.hour, this.children.minute, this.children.second,
    ]).map((input) => input.getValue())
    console.log(this.state.label, { year, month, day, hour, minute, second })
    return (new Date(+year, +month - 1, +day, +hour, +minute, +second)).getTime()
  }
}
