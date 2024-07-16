import { HTML, nFlex, nH1, nLink, nH2 } from '../../assets/js/libs/frontend/index.js'
import { ChallengeListComponent } from './components/challenge.list.component.js'
import * as API from './utils/api.js'

import { padLeft } from './../../assets/js/utils/str.js'

class CardHTML extends HTML {
  state = {
    num: 0,
    text: '',
  }

  children = {
    num: new HTML(),
    text: new HTML(),
  }

  constructor(num = 0, text = '') {
    super()
    this.state.num = num
    this.state.text = text
  }

  onCreate() {
    super.onCreate()
    this.append(this.getNumHTML())
    this.append(this.getTextHTML())
  }

  getNumHTML() {
    this.children.num.setText(padLeft(this.state.num, 2, '0'))
    return this.children.num
  }

  getTextHTML() {
    this.children.text.setText(this.state.text)
    return this.children.text
  }
}

export class Page extends HTML {
  children = {
    errorMessage: new HTML(),
    header: new HTML(),
    resume: new HTML(),
    goals: new HTML(),
    challenges: new HTML(),
    challengesList: new HTML(),
  }

  onCreate() {
    this.append(this.getHeader())
    this.append(this.getErrorMessage())
    this.append(this.getResume())
    this.append(this.getChallenges())

    this.appendChallengesList()
  }

  getHeader() {
    const title = new nH1()
    title.setText('Home Workout')
    title.setStyle('margin', '0rem')
    this.children.header.append(title)
    this.children.header.setStyle('padding', '1rem')
    return this.children.header
  }

  getErrorMessage() {
    return this.children.errorMessage
  }

  getResume() {
    const flex = new nFlex()
    flex.append(new CardHTML(0, 'minutes'))
    flex.append(new CardHTML(0, 'workouts'))
    flex.append(new CardHTML(0, 'kcal'))
    this.children.resume.append(flex)
    this.children.resume.setStyle('text-align', 'center')
    this.children.resume.setStyle('padding', '1rem')
    return this.children.resume
  }

  getChallenges() {
    const title = new nH2()
    title.setText('Challenges')
    this.children.challenges.append(title)
    this.children.challenges.append(this.children.challengesList)
    this.children.challenges.setStyle('margin', '1rem')
    return this.children.challenges
  }

  appendChallengesList() {
    API.getChallengesList()
      .then((res) => {
        this.children.challengesList.clear()
        res.get('list')
          .map((item) => new ChallengeListComponent(item))
          .map((challenge) => this.children.challengesList.append(challenge))
      })
      .catch((err) => this.children.errorMessage.setText(err.message))
  }
}
