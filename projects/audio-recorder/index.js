import { HTML, nLink } from '../../assets/js/libs/frontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'
import { padLeft } from '../../assets/js/utils/str.js'

export class Page extends PaddingComponent {
  state = {
    is_playing: false,
    media_recorder: null,
    timer: 0,
    id: -1,
  }

  children = {
    button: new ButtonComponent({ text: 'play', onclick: () => this.onButtonClick() }),
    records: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getBox())
  }

  setStyles() {
    this.setStyle('text-align', 'center')
  }

  getBox() {
    const html = new HTML()
    html.append(new TextComponent({ text: 'audio recorder' }))
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
    (this.state.is_playing = !this.state.is_playing)
      ? this.startRecord()
      : this.stopRecording()

    this.updateButtonText()
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
    this.state.timer = 0
  }

  getUserMedia() {
    return navigator.mediaDevices.getUserMedia({ audio: true })
  }

  onUserMedia(data) {
    this.state.id = setInterval(() => this.tick(), 1000)
    this.createMediaRecorder(data)
    this.startMediaRecorder()
  }

  tick() {
    this.state.timer++
    this.updateButtonText()
  }

  updateButtonText() {
    this.state.is_playing
      ? this.setButtonText(`stop (${padLeft(this.state.timer, 2, '0')}s)`)
      : this.setButtonText('play')
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
