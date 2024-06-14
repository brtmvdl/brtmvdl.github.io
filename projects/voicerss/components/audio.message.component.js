import { MessageComponent } from './message.component.js'

export class AudioMessageComponent extends MessageComponent {

  onCreate() {
    super.onCreate()
    this.setText('audio message component')
  }
}
