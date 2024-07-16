import { HTML, nH1 } from '../../assets/js/libs/frontend/index.js'

class Question extends HTML {
  constructor({ question = [], answers = [], right = 0 } = {}) {
    super({ component: { name: 'question' } })

    this.question = question
    this.answers = answers
    this.right = right

    this.append(this.getQuestionHTML())
    this.append(this.getAnswersHTML())

    this.addEventListener('rightanswer', ({ data: { answer } }) => console.log('Right answer ' + answer))
    this.addEventListener('wronganswer', ({ data: { answer } }) => console.log('Wrong answer ' + answer))
  }

  createTextElement(text) {
    const el = new HTML()
    el.setText(text)
    return el
  }

  createImageElement(href, alt = '') {
    const el = new nImage()
    el.href(href)
    el.alt(alt)
    return el
  }

  getQuestionHTML() {
    const el = new HTML()

    this.question.map((q) => {
      switch (q.type) {
        case 'text':
          el.append(this.createTextElement(q.text));
          break;

        case 'image':
          el.append(this.createImageElement(q.link, 'image'));
          break;
      }
    })

    return el
  }

  getAnswersHTML() {
    const self = this

    const el = new HTML()

    this.answers.map((q, answer) => {
      const answerEl = new HTML()
      answerEl.setText(`${String.fromCharCode(97 + answer)}: `)
      answerEl.addEventListener('click', () => {
        self.dispatch(
          self.right ? 'rightanswer' : 'wronganswer',
          { answer }
        )
      })

      switch (q.type) {
        case 'text':
          answerEl.append(self.createTextElement(q.text));
          break;

        case 'image':
          answerEl.append(self.createImageElement(q.link, 'image'));
          break;
      }

      el.append(answerEl)
    })

    return el
  }
}

const app = HTML.fromId('app')
app.setStyle('font-family', 'serif')

const header = new HTML()
header.setStyle('text-align', 'center')
const title = new nH1()
title.setText('Vestibular')
header.append(title)
app.append(header)

const testsEl = new HTML()
app.append(testsEl)

const questionsEl = new HTML()
app.append(questionsEl)

const tests = [
  {
    where: 'UNESP',
    when: '2022-1',
    which: 0,
  }
]

const clearLists = () => {
  while (tests.length > 0)
    tests.shift()

  testsEl.clear()
  questionsEl.clear()
}

const setTestsList = (tests = []) => {
  tests.map(({ where, when, which = 0 }) => {
    const el = new HTML()

    const whereEl = new HTML()
    whereEl.setText(where)
    el.append(whereEl)

    const whenEl = new HTML()
    whenEl.setText(when)
    el.append(whenEl)

    const button = new nButton()
    button.setText('Start')
    button.addEventListener('click', () => {
      clearLists()
      API.getTest({ where, when, which })
        .then((res) => res.get('list').map((q) => questionsEl.append(new Question(q))))
        .catch((err) => console.error(err))
    })
    el.append(button)

    testsEl.append(el)
  })
}

API.getTestsList({})
  .then((res) => [
    clearLists(),
    setTestsList(res.get('list', [])),
  ])
  .catch((err) => console.error(err))
