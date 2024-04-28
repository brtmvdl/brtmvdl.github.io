import { HTML, nFlex, nH1, nButton, nInput } from '@brtmvdl/frontend'
import * as LOCAL from '../../assets/js/utils/local.js'

export class Page extends HTML {
  children = {
    title: new nInput(),
    videos: new nFlex(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTitle())
    this.append(this.getListMyVideosButton())
    this.append(this.getTitleInput())
    this.append(this.getInsertLiveStreamsButton())
  }

  getTitle() {
    const h1 = new nH1()
    h1.setText('Youtube')
    return h1
  }

  getTitleInput() {
    this.children.title.setPlaceholder('title')
    return this.children.title
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

  getListMyVideosButton() {
    return this.createButton('list my videos', () => this.listMyVideos())
  }

  listMyVideos() {
    const access_token = this.getAccessToken()
    this.requestAPI('GET', `/videos?chart=mostPopular&maxResults=50`)
      .then((res) => console.log({ res }))
      .catch((err) => console.error(err))
  }

  getInsertLiveStreamsButton() {
    return this.createButton('insert live stream', () => this.insertLiveStream())
  }

  insertLiveStream() {
    const title = this.children.title.getValue()
    this.requestAPI('POST', '/liveStreams?part=id,snippet,cdn,contentDetails,status', {
      snippet: { title },
      cdn: {
        format: '',
        ingestionType: 'rtmp',
        resolution: 'variable',
        frameRate: 'variable',
      },
      contentDetails: { isReusable: false }
    })
      .then((res) => console.log({ res }))
      .catch((err) => console.error(err))
  }

  requestAPI(method, pathname, body = null) {
    const url = `https://www.googleapis.com/youtube/v3${pathname}`
    const headers = { Authorization: `Bearer ${this.getAccessToken()}` }
    body = body && JSON.stringify(body)
    return fetch(url, { body, headers, method }).then((res) => res.json())
  }

  getAccessToken() {
    return LOCAL.get(['access_token'])
  }
}
