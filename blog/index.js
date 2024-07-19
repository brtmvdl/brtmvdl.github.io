import { PaddingComponent } from '../assets/js/components/padding.component.js'
import { TextComponent } from '../assets/js/components/text.component.js'

export class Page extends PaddingComponent {
  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'blog' }))
  }
}
