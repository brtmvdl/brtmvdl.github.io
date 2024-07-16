import { HTML } from '../../assets/js/libs/frontend/index.js'
import { Peer } from '../../assets/js/libs/peerjs/index.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { VideoComponent } from './components/video.component.js'

export class Page extends PaddingComponent {
  children = {
    media_id: new TextComponent({ text: 'media id: ' }),
    media_button: new ButtonComponent({ text: 'user media', onclick: () => this.onUserMediaButtonClick() }),
    media: new VideoComponent(),
    call_id: new InputComponent({ label: 'call id' }),
    call_button: new ButtonComponent({ text: 'call' }),
    call: new VideoComponent(),
    error: new HTML(),
  }

  state = {
    media: null,
    call: null,
    peer: new Peer(),
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(this.getVideosComponent())
    this.append(this.getErrorComponent())
  }

  setEvents() {
    // peer
    this.state.peer.on('open', (data) => this.onPeerOpen(data))
    this.state.peer.on('call', (data) => this.onPeerCall(data))
    // call_button
    this.children.call_button.on('click', () => this.onCallButtonClick())
  }

  onPeerOpen(id) {
    console.log('on peer open', { data: id })
    this.children.media_id.setText('media id: ' + id)
  }

  onPeerCall(call) {
    console.log('on peer call', { call })
    call.answer(this.state.media)
    call.on('stream', (stream) => {
      console.log('on call stream', { stream })
      this.children.call.srcObject(this.state.call = stream)
      this.children.call.play()
    })
  }

  onUserMediaButtonClick() {
    this.getUserMedia()
    navigator.getUserMedia({ audio: true, video: true }, (stream) => {
      console.log('on user media', { stream })
      this.children.media.srcObject(this.state.media = stream)
      this.children.media.play()
    }, (error) => {
      this.children.error.clear()
      this.children.error.append(new TextComponent({ text: error.toString() }))
    })
  }

  getUserMedia() {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
  }

  getVideosComponent() {
    return new TwoColumnsComponent({
      html1: this.getLeft(),
      html2: this.getRight(),
      widths: ['48%', '48%'],
    })
  }

  getLeft() {
    const html = new HTML()
    html.append(this.children.media_id)
    html.append(this.children.media_button)
    html.append(this.children.media)
    return html
  }

  getRight() {
    const html = new HTML()
    html.append(this.children.call_id)
    html.append(this.children.call_button)
    html.append(this.children.call)
    return html
  }

  getErrorComponent() {
    return this.children.error
  }

  onCallButtonClick(id = this.children.call_id.getValue(), stream = this.state.media) {
    console.log('on Call Button Click', { id })
    this.state.peer.call(id, stream)
  }
}
