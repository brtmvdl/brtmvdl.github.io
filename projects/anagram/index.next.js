import { HTML, nFlex } from '@brtmvdl/frontend'
import { TextComponent } from '../../assets/js/components/text.component.js'

class LetterComponent extends HTML {
  letter = ''

  constructor({ letter = 'a' } = {}) {
    super()
    this.letter = letter
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.setStyle('padding', '1rem')
    this.setStyle('font-size', '4rem')
    this.setContainerStyle('vertical-align', 'middle')
    this.setText(this.letter)
  }

  setEvents() {
    this.on('mouseenter', () => this.onMouseEnter())
    this.on('mouseleave', () => this.onMouseLeave())
    this.on('mousedown', () => this.onMouseDown())
    this.on('mouseup', () => this.onMouseUp())
  }

  onMouseEnter() {
    console.log('mouse enter', this.letter)
  }

  onMouseLeave() {
    console.log('mouse leave', this.letter)
  }

  onMouseDown() {
    console.log('mouse down', this.letter)
  }

  onMouseUp() {
    console.log('mouse up', this.letter)
  }
}

export class Page extends HTML {
  children = {
    letters: new nFlex(),
  }

  state = {
    letters: ['a', 'n', 'a', 'g', 'r', 'a', 'm'],
    cursor: 0,
  }

  onCreate() {
    super.onCreate()
    this.append(this.getLetters())
    this.update()
  }

  getLetters() {
    this.children.letters.setStyle('margin', '0 auto')
    this.children.letters.setStyle('max-width', '40rem')
    return this.children.letters
  }

  update() {
    this.children.letters.clear()
    this.state.letters.map((letter) => {
      this.children.letters.append(new LetterComponent({ letter }))
    })
    console.log('update')
  }
}
