import { HTML } from '@brtmvdl/frontend'
import { PaddingComponent } from '../assets/js/components/padding.component.js'
import { LinkComponent } from '../assets/js/components/link.component.js'
import { TextComponent } from '../assets/js/components/text.component.js'
import experiences from '../assets/js/lists/experiences.js'
import { stepName } from '../assets/js/utils/functions.js'

export class Page extends PaddingComponent {
  onCreate() {
    super.onCreate()
    this.append(this.getBody())
  }

  getBody() {
    const html = new HTML()
    html.append(new TextComponent({ text: 'experiences' }))
    Array.from(experiences).map(({ id, step }) => html.append(new LinkComponent({ text: id + stepName(step, ' (', ') '), href: `/projects/${id}/` })))
    return html
  }

}
