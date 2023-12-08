import { HTML, nButton, nVideo } from '@brtmvdl/frontend'

export class Page extends HTML {
  children = {
    videoElem: new nVideo(),
    logElem: new HTML(),
    startElem: new nButton(),
    stopElem: new nButton(),
  }

  state = {
    srcObject: null,
    displayMedia: { video: { displaySurface: 'window' }, audio: false },
  }

  onCreate() {
    this.setText('page')
    this.append(this.getVideoElem())
    this.append(this.getStartElem())
    this.append(this.getStopElem())
    this.append(this.getLogElem())
  }

  getVideoElem() {
    return this.children.videoElem
  }

  getLogElem() {
    return this.children.logElem
  }

  getStartElem() {
    this.children.startElem.setText('start')
    this.children.startElem.on('click', () => this.startCapture())

    return this.children.startElem
  }

  getStopElem() {
    this.children.stopElem.setText('stop')
    this.children.stopElem.on('click', () => this.stopCapture())

    return this.children.stopElem
  }

  startCapture() {
    const self = this

    self.children.logElem.setText('')

    navigator.mediaDevices.getDisplayMedia(self.state.displayMedia)
      .then((src) => self.state.srcObject = src)
      .then(() => self.children.videoElem.element.srcObject = (self.state.srcObject))
      .then(() => self.children.videoElem.play())
      .catch((err) => console.error(err))
  }

  stopCapture() {
    this.children.videoElem.element.srcObject.getTracks().forEach((track) => track.stop())
    this.children.videoElem.element.srcObject = null
  }

  dumpOptionsInfo() {
    const videoTrack = this.children.videoElem.element.srcObject.getVideoTracks()[0]
    
    this.children.logElem.setText('Track settings:' + JSON.stringify(videoTrack?.getSettings(), null, 4))
    this.children.logElem.setText('Track constraints:' + JSON.stringify(videoTrack?.getConstraints(), null, 4))
  }
}
