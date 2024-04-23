import { HTML, nButton } from '@brtmvdl/frontend'
import * as LOCAL from '../../assets/js/utils/local.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getTitle())
    this.append(this.getButtons())
  }

  getTitle() {
    const html = new HTML()
    html.setText('Youtube')
    return html
  }

  getButtons() {
    const html = new HTML()
    html.append(this.getVideosListButton())
    html.append(this.getVideosRatingButton())
    return html
  }

  createButton(text, onclick = (() => { })) {
    const button = new nButton()
    button.setText(text)
    button.on('click', () => onclick())
    return button
  }

  getVideosListButton() {
    return this.createButton('list videos', () => this.listVideos())
  }

  listVideos() {
    this.requestAPI('GET', '/videos?myRating=like')
  }

  getVideosRatingButton() {
    return this.createButton('get videos rating', () => this.getVideosRating())
  }

  getVideosRating(id = '') {
    this.requestAPI('GET', `/videos/getRating?id=${id}`)
  }

  requestAPI(method, pathname, body = null) {
    const url = `https://www.googleapis.com/youtube/v3${pathname}`
    const headers = { Authorization: `Bearer ${LOCAL.get(['access_token'])}` }
    fetch(url, { body, headers, method })
      .then((res) => res.json())
      .then((json) => console.log({ json }))
      .catch((err) => console.error(err))
  }
}
