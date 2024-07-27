import { HTML, nVideo } from '../../assets/js/libs/frontend/index.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'

import { GOOGLE, discovery } from '../../assets/js/utils/googleusercontent.js'
import { datetime2str } from '../../assets/js/utils/datetime.js'
import * as API from '../../assets/js/utils/api.js'
import { API_KEY } from './config.js'

export class Page extends PaddingComponent {
  children = {
    videoElem: new nVideo(),
    log: new HTML(),
  }

  state = {
    displayMedia: { video: true, audio: true },
    src: null,
    chunks: [],
    apiKey: API_KEY,
    broadcastId: '',
    streamId: '',
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'screen capture api' }))
    this.append(new TwoColumnsComponent({ html1: this.getLeft(), html2: this.getRight(), }))
  }

  getLeft() {
    const html = new HTML()
    html.append(new TextComponent({ text: 'capture' }))
    html.append(new ButtonComponent({ text: 'start capture', onclick: () => this.startCapture() }),)
    html.append(new ButtonComponent({ text: 'stop capture', onclick: () => this.stopCapture() }),)
    html.append(new TextComponent({ text: 'gapi' }))
    html.append(new ButtonComponent({ text: 'load gapi', onclick: () => this.loadGAPI() }),)
    html.append(new TextComponent({ text: 'youtube api' }))
    html.append(new ButtonComponent({ text: 'insert', onclick: () => this.insert() }),)
    html.append(new ButtonComponent({ text: 'execute', onclick: () => this.execute() }),)
    return html
  }

  getRight() {
    const html = new HTML()
    html.append(this.getVideoElem())
    html.append(this.getLog())
    return html
  }

  getVideoElem() {
    return this.children.videoElem
  }

  getLog() {
    return this.children.log
  }

  startCapture() {
    const self = this
    self.children.log.clear()

    navigator.mediaDevices.getDisplayMedia(self.state.displayMedia)
      .then((src) => self.state.src = (src))
      .then(() => console.log('state.src', self.state.src))
      .then(() => self.children.videoElem.setSrcObject(self.state.src))
      .then(() => self.children.videoElem.play())
      .catch((err) => console.error(err))
  }

  stopCapture() {
    this.children.videoElem.getSrcObject().getTracks().forEach((t) => t.stop())
    this.children.videoElem.setSrcObject(null)
  }

  loadGAPI() {
    gapi.client.setApiKey(GOOGLE.api_key)
    gapi.client.load(discovery).then(console.log).catch(console.error)
  }

  execute() {
    const b = { id: this.state.broadcastId, part: ['snippet'], streamId: this.state.streamId }
    return new Promise((s, f) => gapi.client.youtube.liveBroadcasts.bind(b).then(s).catch(f))
  }

  insert() {
    const scheduledStartTime = datetime2str()
    const params = { part: 'id,snippet,contentDetails,status', }

    const body = {
      snippet: { title: `youtube.livebroadcasts-${scheduledStartTime}`, scheduledStartTime },
      status: { privacyStatus: 'unlisted' }
    }

    API.rest.youtube.v3.liveBroadcasts.insert(params, body).then(console.log).catch(console.error)
  }
}
