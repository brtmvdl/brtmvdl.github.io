import { HTML, nVideo } from '../../assets/js/libs/frontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { GOOGLE } from './../../assets/js/utils/googleusercontent.js'
import { API_KEY } from './config.js'

export class Page extends PaddingComponent {

  children = {
    videoElem: new nVideo(),
    log: new HTML(),
    startCaptureButton: new ButtonComponent({ text: 'start capture' }),
    stopCaptureButton: new ButtonComponent({ text: 'stop capture' }),
    startRecordButton: new ButtonComponent({ text: 'start Record' }),
    stopRecordButton: new ButtonComponent({ text: 'stop record' }),
    authenticateButton: new ButtonComponent({ text: 'authenticate' }),
    loadClientButton: new ButtonComponent({ text: 'load Client' }),
    executeButton: new ButtonComponent({ text: 'execute' }),
    insertButton: new ButtonComponent({ text: 'insert' }),
    loadButton: new ButtonComponent({ text: 'load' }),
  }

  state = {
    displayMedia: { video: { displaySurface: 'window' }, audio: false },
    scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
    src: null,
    chunks: [],
    recorder: null,
    apiKey: API_KEY,
    broadcastId: '',
    streamId: '',
  }

  onCreate() {
    super.onCreate()
    this.setText('page')
    this.append(this.getVideoElem())
    this.append(this.getStartCaptureButton())
    this.append(this.getStopCaptureButton())
    this.append(this.getStartRecordButton())
    this.append(this.getStopRecordButton())
    this.append(this.getLoadButton())
    this.append(this.getLoadClientButton())
    this.append(this.getAuthenticateButton())
    this.append(this.getInsertButton())
    this.append(this.getExecuteButton())
    this.append(this.getLog())
  }

  getVideoElem() {
    return this.children.videoElem
  }

  getLog() {
    return this.children.log
  }

  getStartCaptureButton() {
    this.children.startCaptureButton.setText('start capture')
    this.children.startCaptureButton.addEventListener('click', () => this.startCapture())
    return this.children.startCaptureButton
  }

  getStopCaptureButton() {
    this.children.stopCaptureButton.setText('stop capture')
    this.children.stopCaptureButton.addEventListener('click', () => this.stopCapture())
    return this.children.stopCaptureButton
  }

  startCapture() {
    const self = this
    self.children.log.setText('')

    navigator.mediaDevices.getDisplayMedia(self.state.displayMedia)
      .then((src) => self.state.src = (src))
      .then(() => console.log('state.src', self.state.src))
      .then(() => self.children.videoElem.setSrcObject(self.state.src))
      .then(() => self.children.videoElem.play())
      .then(() => this.setRecorder())
      .catch((err) => console.error(err))
  }

  stopCapture() {
    this.children.videoElem.getSrcObject().getTracks().forEach((t) => t.stop())
    this.children.videoElem.setSrcObject(null)
  }

  getStartRecordButton() {
    this.children.startRecordButton.setText('start Record')
    this.children.startRecordButton.addEventListener('click', () => this.startRecord())
    return this.children.startRecordButton
  }

  getStopRecordButton() {
    this.children.stopRecordButton.setText('stop Record')
    this.children.stopRecordButton.addEventListener('click', () => this.stopRecord())
    return this.children.stopRecordButton
  }

  setRecorder() {
    this.state.recorder = new MediaRecorder(this.state.src, { mimeType: 'video/webm' })
    this.state.recorder.addEventListener('dataavailable', (e) => this.onRecorderDataAvailable(e))
    this.state.recorder.addEventListener('stop', (e) => this.onRecorderStop(e))
  }

  onRecorderDataAvailable(e) {
    this.state.chunks.push(e.data)
  }

  onRecorderStop(e) {
    const blob = new Blob(this.state.chunks, { type: 'video/webm' })
    this.saveBlob(blob)
  }

  async saveBlob(blob) {
    console.log('save blob', blob)
  }

  startRecord() {
    this.state.recorder?.start()
  }

  stopRecord() {
    this.state.recorder?.stop()
  }


  authenticate() {
    return new Promise((s, f) => gapi.auth2.getAuthInstance().signIn({ scope: this.state.scope }).then(s).catch(f))
  }

  getAuthenticateButton() {
    this.children.authenticateButton.setText('authenticate')
    this.children.authenticateButton.addEventListener('click', () => this.authenticate().then(console.log).catch(console.error))
    return this.children.authenticateButton
  }

  loadClient() {
    const url = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
    return new Promise((s, f) => gapi.client.load(url).then(s).catch(f))
  }

  getLoadClientButton() {
    this.children.loadClientButton.setText('load client')
    this.children.loadClientButton.addEventListener('click', () => this.loadClient().then(console.log).catch(console.error))
    return this.children.loadClientButton
  }

  execute() {
    const b = { id: this.state.broadcastId, part: ['snippet'], streamId: this.state.streamId }
    return new Promise((s, f) => gapi.client.youtube.liveBroadcasts.bind(b).then(s).catch(f))
  }

  getExecuteButton() {
    this.children.executeButton.setText('execute')
    this.children.executeButton.addEventListener('click', () => this.execute().then(console.log).catch(console.error))

    return this.children.executeButton
  }

  insert() {
    const scheduledStartTime = (new Date()).toISOString()
    const title = `youtube.liveBroadcasts-${scheduledStartTime}`

    return new Promise((s, f) => gapi.client.youtube.liveBroadcasts.insert({
      resource: { snippet: { scheduledStartTime, title }, status: { privacyStatus: 'unlisted' } }
    }).then(s).catch(f))
  }

  getInsertButton() {
    this.children.insertButton.setText('insert')
    this.children.insertButton.addEventListener('click', () => this.insert().then(console.log).catch(console.error))
    return this.children.insertButton
  }

  auth2init() {
    const client_id = GOOGLE.client_id
    const redirect_uri = (window.location).toString()
    gapi.auth2.init({ client_id, redirect_uri }, console.log)
  }

  loadGAPI() {
    gapi.load('client:auth2', () => this.auth2init())
  }

  getLoadButton() {
    this.children.loadButton.setText('load GAPI')
    this.children.loadButton.addEventListener('click', () => this.loadGAPI())
    return this.children.loadButton
  }
}
