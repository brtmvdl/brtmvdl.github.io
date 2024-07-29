import { MessageComponent } from './message.component.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'
import { nAudio } from './audio.js'

export class AudioMessageComponent extends MessageComponent {
  onCreate() {
    super.onCreate()
    this.append(this.getTextComponent())
    this.append(this.getAudioComponent())
  }

  getTextComponent() {
    return new TextComponent({ text: this.message.text })
  }

  getAudioComponent() {
    return new nAudio(this.message.url)
  }
}
