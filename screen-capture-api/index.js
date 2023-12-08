import { HTML, nButton, nVideo } from '@brtmvdl/frontend'

import { CLIENT_ID, API_KEY } from './config.js'

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
    loadButton: new nScreenButton(),
  }

  state = {
    displayMedia: { video: { displaySurface: 'window' }, audio: false },
    src: null,
    chunks: [],
    recorder: null,
    clientId: CLIENT_ID,
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
    //
    this.append(this.getLoadButton())
    this.append(this.getLoadClientButton())
    this.append(this.getAuthenticateButton())
    this.append(this.getExecuteButton())
    //
    this.append(this.getLog())
    this.setEvents()
  }

  setEvents() {
  }

  getVideoElem() {
    return this.children.videoElem
  }

  getLog() {
    return this.children.log
  }

  getStartCaptureButton() {
    this.children.startCaptureButton.setText('start capture')
    this.children.startCaptureButton.on('click', () => this.startCapture())

    return this.children.startCaptureButton
  }

  getStopCaptureButton() {
    this.children.stopCaptureButton.setText('stop capture')
    this.children.stopCaptureButton.on('click', () => this.stopCapture())

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

  dumpOptionsInfo() {
    const videoTrack = this.children.videoElem.getSrcObject().getVideoTracks()[0]

    this.children.log.setText('Track settings:' + JSON.stringify(videoTrack?.getSettings(), null, 4))
    this.children.log.setText('Track constraints:' + JSON.stringify(videoTrack?.getConstraints(), null, 4))
  }

  getStartRecordButton() {
    this.children.startRecordButton.setText('start Record')
    this.children.startRecordButton.on('click', () => this.startRecord())

    return this.children.startRecordButton
  }

  getStopRecordButton() {
    this.children.stopRecordButton.setText('stop Record')
    this.children.stopRecordButton.on('click', () => this.stopRecord())

    return this.children.stopRecordButton
  }

  setRecorder() {
    this.state.recorder = new MediaRecorder(this.state.src, { mimeType: 'video/webm' })

    this.state.recorder.addEventListener('dataavailable', (e) => this.onRecorderDataAvailable(e))
    this.state.recorder.addEventListener('start', (e) => this.onRecorderStart(e))
    this.state.recorder.addEventListener('stop', (e) => this.onRecorderStop(e))
  }

  onRecorderDataAvailable(e) {
    this.state.chunks.push(e.data)
  }

  onRecorderStart(e) {
    console.log('recorder start', e)
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
    if (this.state.recorder) {
      this.state.recorder.start()
    }
  }

  stopRecord() {
    if (this.state.recorder) {
      this.state.recorder.stop()
    }
  }


  authenticate() {
    const scope = 'https://www.googleapis.com/auth/youtube.force-ssl'

    return new Promise((s, f) => gapi.auth2.getAuthInstance().signIn({ scope }).then(s).catch(f))
  }

  getAuthenticateButton() {
    this.children.authenticateButton.setText('authenticate')
    this.children.authenticateButton.on('click', () => this.authenticate().then(console.log).catch(console.error))

    return this.children.authenticateButton
  }

  loadClient() {
    gapi.client.setApiKey(this.state.apiKey)
    const url = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
    return new Promise((s, f) => gapi.client.load(url).then(s).catch(f))

  }

  getLoadClientButton() {
    this.children.loadClientButton.setText('load client')
    this.children.loadClientButton.on('click', () => this.loadClient().then(console.log).catch(console.error))

    return this.children.loadClientButton
  }

  execute() {
    const b = { id: this.state.broadcastId, part: ['snippet'], streamId: this.state.streamId }
    return new Promise((s, f) => gapi.client.youtube.liveBroadcasts.bind(b).then(s).catch(f))
  }

  getExecuteButton() {
    this.children.executeButton.setText('execute')
    this.children.executeButton.on('click', () => this.execute().then(console.log).catch(console.error))

    return this.children.executeButton
  }

  loadGAPI() {
    const client_id = this.state.clientId
    gapi.load('client:auth2', () => gapi.auth2.init({ client_id }, console.log))
  }

  getLoadButton() {
    this.children.loadButton.setText('load GAPI')
    this.children.loadButton.on('click', () => this.loadGAPI())

    return this.children.loadButton
  }
}
