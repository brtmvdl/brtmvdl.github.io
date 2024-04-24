import { HTML, nH1, nButton } from '@brtmvdl/frontend'
import { VideoComponent } from './components/video.component.js'
import * as LOCAL from '../../assets/js/utils/local.js'

export class Page extends HTML {
  children = {
    videos: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTitle())
    this.append(this.getButtons())
    this.append(this.getVideos())
  }

  getTitle() {
    const h1 = new nH1()
    h1.setText('Youtube')
    return h1
  }

  getButtons() {
    const html = new HTML()
    html.append(this.getVideosListButton())
    return html
  }

  createButton(text, onclick = (() => { })) {
    const button = new nButton()
    button.setText(text)
    button.on('click', () => onclick())
    button.setStyle('border', 'none')
    button.setStyle('padding', '1rem')
    button.setStyle('color', '#ffffff')
    button.setStyle('background-color', '#000000')
    return button
  }

  getVideosListButton() {
    return this.createButton('list videos', () => this.listVideos())
  }

  listVideos() {
    this.requestAPI('GET', '/videos?myRating=like&maxResults=50')
      .then(({ items }) => Array.from(items).map((item) => this.children.videos.append(new VideoComponent(item))))
      .catch((err) => console.error(err))
  }

  requestAPI(method, pathname, body = null) {
    const url = `https://www.googleapis.com/youtube/v3${pathname}`
    const headers = { Authorization: `Bearer ${LOCAL.get(['access_token'])}` }
    return fetch(url, { body, headers, method })
      .then((res) => res.json())
  }

  getVideos() {
    return this.children.videos
  }

}
