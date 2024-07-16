import { HTML, nButton, nFlex, nH1, nHr } from '../../assets/js/libs/frontend/index.js'
import * as API from '../utils/api.js'

import { padLeft } from './../../../assets/js/utils/str.js'
import * as LOCAL from './../../../assets/js/utils/local.js'

export class Page extends HTML {
  children = {
    error: new HTML(),
    title: new nH1(),
    resume: new HTML(),
    workouts: new HTML(),
  }

  onCreate() {
    this.append(this.getTitle())
    this.append(this.getResume())
    this.append(this.getWorkouts())

    API.getChallengeItem(LOCAL.get([window.location.pathname], null))
      .then((res) => (res.get('item')))
      .then(({ id, level, title, workouts }) => {
        this.children.title.setText(title)
        this.setResume(workouts)
        this.setWorkouts(workouts)
      })
      .catch((err) => this.children.error.setText(err.message))
  }

  getTitle() {
    const flex = new nFlex()

    // this.children.title.setStyle('margin', 'calc(1rem / 2) 0rem')
    this.children.title.setStyle('padding', '0rem')
    flex.append(this.children.title)

    const button = new nButton()
    button.setText('start')
    button.setStyle('border', 'none')
    button.setStyle('color', '#ffffff')
    button.setStyle('padding', '1rem 2rem')
    button.setStyle('background-color', '#000000')
    // button.setStyle('border-radius', 'calc(1rem / 8)')
    button.addEventListener('click', () => { })
    flex.append(button)

    return flex
  }

  getResume() {
    this.children.resume.setStyle('padding', '1rem 0rem')

    return this.children.resume
  }

  secondsToMinutes(s = 0) {
    const sec = s * (60 ** 0)
    const min = (s * (60 ** 1)) - (sec * (60))

    return `${padLeft(min, 2, '0')}:${padLeft(sec, 2, '0')}`
  }

  setResume(workouts = []) {
    const time = Array.from(workouts).filter((w) => w.time).reduce((num, w) => num + w.time, 0)

    const ws = Array.from(workouts).filter((w) => w.workouts).reduce((num, w) => num + w.workouts, 0)

    this.children.resume.setText(
      [
        `${this.secondsToMinutes(time)} min`,
        `${ws} workouts`,
      ].join(' - ')
    )
  }

  getWorkouts() {
    return this.children.workouts
  }

  setWorkouts(workouts = []) {
    Array.from(workouts).map((_) => {
      const workout = new HTML()

      const title = new HTML()
      title.setText(_.title)
      title.setStyle('padding', 'calc(1rem / 2) 0rem')
      workout.append(title)

      const count = new HTML()
      if (_.time) count.setText(`${_.time} sec`)
      else count.setText(`${_.workouts} workouts`)
      count.setStyle('padding', 'calc(1rem / 2) 0rem')
      workout.append(count)

      workout.append(new nHr())

      this.children.workouts.append(workout)
    })
  }

}
