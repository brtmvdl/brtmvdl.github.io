import { HTML, nLink } from '@brtmvdl/frontend'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'

export class Page extends HTML {
  state = {
    is_playing: false,
    media_recorder: null,
  }

  children = {
    button: new ButtonComponent({ text: 'play', onclick: () => this.onButtonClick() }),
    records: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getBox())
  }

  getBox() {
    const html = new HTML()
    html.setStyle('text-align', 'center')
    html.setStyle('margin', '0 auto')
    html.setStyle('width', '20rem')
    html.append(new TextComponent({ text: 'Audio' }))
    html.append(this.getPlayButton())
    html.append(this.getRecordsHTML())
    return html
  }

  getPlayButton() {
    return this.children.button
  }

  getRecordsHTML() {
    return this.children.records
  }

  onButtonClick() {
    if (this.state.is_playing = !this.state.is_playing) {
      this.startRecord()
      this.setButtonText('stop')
    } else {
      this.stopRecording()
      this.setButtonText('play')
    }
  }

  setButtonText(text = '') {
    this.children.button.setText(text)
  }

  startRecord() {
    this.getUserMedia()
      .then((stream) => this.onUserMedia(stream))
      .catch((err) => console.error(err))
  }

  stopRecording() {
    this.state.media_recorder?.stop()
  }

  getUserMedia() {
    return navigator.mediaDevices.getUserMedia({ audio: true })
  }

  onUserMedia(data) {
    this.createMediaRecorder(data)
    this.startMediaRecorder()
  }

  createMediaRecorder(stream) {
    this.state.media_recorder = new MediaRecorder(stream)
  }

  startMediaRecorder() {
    if (this.state.media_recorder) {
      this.state.media_recorder.start()
      this.state.media_recorder.addEventListener('dataavailable', (data) => this.onMediaRecorderDataAvailable(data))
    }
  }

  onMediaRecorderDataAvailable({ data } = {}) {
    const url = window.URL.createObjectURL(data)
    this.children.records.append(this.createLinkElement(url, Date.now() + '.webm'))
  }

  createLinkElement(url, name) {
    const link = new LinkComponent({ text: name, href: url })
    link.setAttr('download', name)
    return link
  }
}
