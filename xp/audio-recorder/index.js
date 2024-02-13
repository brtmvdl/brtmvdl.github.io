import { HTML, nButton, nLink } from '@brtmvdl/frontend'

export class Page extends HTML {
  state = {
    isPlaying: false,
    mediaRecorder: null,
  }

  children = {
    button: new nButton(),
    records: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTitleHTML())
    this.append(this.getPlayButton())
    this.append(this.getRecordsHTML())
  }

  getTitleHTML() {
    const html = new HTML()
    html.setText('Audio')
    return html
  }

  getPlayButton() {
    this.setButtonText('Play')
    this.children.button.on('click', () => this.onButtonClick())
    return this.children.button
  }

  getRecordsHTML() {
    return this.children.records
  }

  onButtonClick() {
    if (this.state.isPlaying = !this.state.isPlaying) {
      this.startRecord()
      this.setButtonText('Stop')
    } else {
      this.stopRecording()
      this.setButtonText('Play')
    }
  }

  setButtonText(text = '') {
    this.children.button.setText(text)
  }

  startRecord() {
    this.getUserMedia()
      .then((data) => this.onUserMedia(data))
      .catch((err) => console.error(err))
  }

  getUserMedia() {
    return navigator.mediaDevices.getUserMedia({ audio: true })
  }

  onUserMedia(data) {
    this.createMediaRecorder(data)
    this.startMediaRecorder()
  }

  createMediaRecorder(stream) {
    this.state.mediaRecorder = new MediaRecorder(stream)
  }

  startMediaRecorder() {
    if (this.state.mediaRecorder) {
      this.state.mediaRecorder.start()
      this.state.mediaRecorder.addEventListener('dataavailable', (data) => this.onMediaRecorderDataAvailable(data))
    }
  }

  onMediaRecorderDataAvailable(ev) {
    const url = window.URL.createObjectURL(ev.data)
    this.children.records.append(this.createLinkElement(url, Date.now() + '.webm'))
  }

  createLinkElement(url, name) {
    const link = new nLink()
    link.href(url)
    link.setText(name)
    link.setAttr('download', name)
    return link
  }

  stopRecording() {
    if (this.state.mediaRecorder) {
      this.state.mediaRecorder.stop()
    }
  }
}
