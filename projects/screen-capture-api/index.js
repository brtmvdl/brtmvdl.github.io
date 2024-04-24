import { HTML, nButton, nVideo } from '@brtmvdl/frontend'

import { API_KEY } from './config.js'

import { GOOGLE } from './../../assets/js/utils/googleusercontent.js'

class nScreenButton extends nButton {
  onCreate() {
    this.setStyle('background-color', '#000000')
    this.setStyle('color', '#ffffff')
    this.setStyle('padding', '1rem')
    this.setStyle('margin', '1rem')
    this.setStyle('border', 'none')
  }
}

export class Page extends HTML {

  children = {
    videoElem: new nVideo(),
    log: new HTML(),
    startCaptureButton: new nScreenButton(),
    stopCaptureButton: new nScreenButton(),
    startRecordButton: new nScreenButton(),
    stopRecordButton: new nScreenButton(),
    authenticateButton: new nScreenButton(),
    loadClientButton: new nScreenButton(),
    executeButton: new nScreenButton(),
    insertButton: new nScreenButton(),
    loadButton: new nScreenButton(),
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
    console.log('getVideoElem')

    return this.children.videoElem
  }

  getLog() {
    console.log('getLog')

    return this.children.log
  }

  getStartCaptureButton() {
    console.log('getStartCaptureButton')

    this.children.startCaptureButton.setText('start capture')
    this.children.startCaptureButton.on('click', () => this.startCapture())

    return this.children.startCaptureButton
  }

  getStopCaptureButton() {
    console.log('getStopCaptureButton')

    this.children.stopCaptureButton.setText('stop capture')
    this.children.stopCaptureButton.on('click', () => this.stopCapture())

    return this.children.stopCaptureButton
  }

  startCapture() {
    console.log('startCapture')

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
    console.log('stopCapture')

    this.children.videoElem.getSrcObject().getTracks().forEach((t) => t.stop())
    this.children.videoElem.setSrcObject(null)
  }

  getStartRecordButton() {
    console.log('getStartRecordButton')

    this.children.startRecordButton.setText('start Record')
    this.children.startRecordButton.on('click', () => this.startRecord())

    return this.children.startRecordButton
  }

  getStopRecordButton() {
    console.log('getStopRecordButton')

    this.children.stopRecordButton.setText('stop Record')
    this.children.stopRecordButton.on('click', () => this.stopRecord())

    return this.children.stopRecordButton
  }

  setRecorder() {
    console.log('setRecorder')

    this.state.recorder = new MediaRecorder(this.state.src, { mimeType: 'video/webm' })

    this.state.recorder.addEventListener('dataavailable', (e) => this.onRecorderDataAvailable(e))
    this.state.recorder.addEventListener('stop', (e) => this.onRecorderStop(e))
  }

  onRecorderDataAvailable(e) {
    console.log('onRecorderDataAvailable', e)

    this.state.chunks.push(e.data)
  }

  onRecorderStop(e) {
    console.log('recorder stop', e)

    const blob = new Blob(this.state.chunks, { type: 'video/webm' })
    console.log('recorder blob', blob)

    this.saveBlob(blob)
  }

  async saveBlob(blob) {
    console.log('save blob', blob)
  }

  startRecord() {
    console.log('startRecord')

    this.state.recorder?.start()
  }

  stopRecord() {
    console.log('stopRecord')

    this.state.recorder?.stop()
  }


  authenticate() {
    console.log('authenticate')

    return new Promise((s, f) => gapi.auth2.getAuthInstance().signIn({
      scope: this.state.scope
    }).then(s).catch(f))
  }

  getAuthenticateButton() {
    console.log('getAuthenticateButton')

    this.children.authenticateButton.setText('authenticate')
    this.children.authenticateButton.on('click', () => this.authenticate().then(console.log).catch(console.error))

    return this.children.authenticateButton
  }

  loadClient() {
    console.log('loadClient')

    const url = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
    return new Promise((s, f) => gapi.client.load(url).then(s).catch(f))
  }

  getLoadClientButton() {
    console.log('getLoadClientButton')

    this.children.loadClientButton.setText('load client')
    this.children.loadClientButton.on('click', () => this.loadClient().then(console.log).catch(console.error))

    return this.children.loadClientButton
  }

  execute() {
    console.log('execute')

    const b = { id: this.state.broadcastId, part: ['snippet'], streamId: this.state.streamId }
    return new Promise((s, f) => gapi.client.youtube.liveBroadcasts.bind(b).then(s).catch(f))
  }

  getExecuteButton() {
    console.log('getExecuteButton')

    this.children.executeButton.setText('execute')
    this.children.executeButton.on('click', () => this.execute().then(console.log).catch(console.error))

    return this.children.executeButton
  }

  insert() {
    console.log('insert')

    const scheduledStartTime = (new Date()).toISOString()
    const title = `youtube.liveBroadcasts-${scheduledStartTime}`

    return new Promise((s, f) => gapi.client.youtube.liveBroadcasts.insert({
      resource: { snippet: { scheduledStartTime, title }, status: { privacyStatus: 'unlisted' } }
    }).then(s).catch(f))
  }

  getInsertButton() {
    console.log('getInsertButton')

    this.children.insertButton.setText('insert')
    this.children.insertButton.on('click', () => this.insert().then(console.log).catch(console.error))

    return this.children.insertButton
  }

  auth2init() {
    console.log('auth2init')

    const client_id = GOOGLE.client_id
    const redirect_uri = (window.location).toString()
    console.log('auth2init', { client_id, redirect_uri })
    gapi.auth2.init({ client_id, redirect_uri }, console.log)
  }

  loadGAPI() {
    console.log('loadGAPI')

    gapi.load('client:auth2', () => this.auth2init())
  }

  getLoadButton() {
    console.log('getLoadButton')

    this.children.loadButton.setText('load GAPI')
    this.children.loadButton.on('click', () => this.loadGAPI())

    return this.children.loadButton
  }
}
