import { HTML } from '@brtmvdl/frontend'
import { ChatHTML } from './components/chat.js'

export class Page extends HTML {
  onCreate() {
    this.append(new ChatHTML())
  }
}