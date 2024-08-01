import { HTML, nFlex } from '../../assets/js/libs/frontend/index.js'

HTML.fromElement(document.body)
  .setStyle('background-color', '#000000')
  .setStyle('font-family', 'sans-serif')
  .setStyle('font-size', '8vw')
  .setStyle('color', '#ffffff')

const app = HTML.fromId('app')

const letters = new nFlex()
letters.setContainerStyle('text-align', 'center')
letters.setStyle('margin', '8rem auto')
letters.setStyle('width', '16rem')

class nLetter extends HTML {
  state = {
    letter: null,
    touch: null
  }

  children = {
    letter: new HTML(),
  }

  constructor(letter) {
    super()
    this.state.letter = letter
  }

  getName() { return 'letter' }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.setEvents()
    this.append(this.getLetterHTML())
  }

  setStyles() {
    this.setStyle('padding', '0.5rem')
  }

  setEvents() {
    this.addEventListener('touchstart', (data) => this.onTouchStart(data))
    this.addEventListener('touchend', (data) => this.onTouchEnd(data))
    this.addEventListener('wheel', (data) => this.onWheel(data))
  }

  onTouchStart(data) {
    this.state.touch = data.changedTouches[0].pageY
  }

  onTouchEnd(data) {
    if (this.state.touch - data.changedTouches[0].pageY > 0) this.goNext()
    else this.goPrevious()
  }

  onWheel(data) {
    if (data.deltaY < 0) this.goNext()
    else this.goPrevious()
  }

  goNext() {
    this.setLetter(this.state.letter + 1)
  }

  goPrevious() {
    this.setLetter(this.state.letter - 1)
  }

  setLetter(letter) {
    if (letter < 97) letter = 97 // a
    if (letter > 122) letter = 122 // z
    this.state.letter = letter
    this.update()
  }

  getLetterHTML() {
    this.update()
    return this.children.letter
  }

  update() {
    this.children.letter.setText(this.getLetter())
  }

  getLetter() {
    return String.fromCharCode(this.state.letter)
  }

}

Array.from([97, 110, 97, 103, 114, 97, 109]).map((l) => letters.append(new nLetter(l)))

app.append(letters)
