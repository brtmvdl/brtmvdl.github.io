import { MessageComponent } from './message.component.js'
import { nAudio } from './audio.js'

export class AudioMessageComponent extends MessageComponent {
  onCreate() {
    super.onCreate()
    this.append(this.getAudio())
  }

  getAudio() {
    console.log('url', this.message.url)
    return new nAudio(this.message.url)
  }

}
