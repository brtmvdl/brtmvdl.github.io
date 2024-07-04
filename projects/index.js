import { HTML } from '@brtmvdl/frontend'
import { PaddingComponent } from '../assets/js/components/padding.component.js'
import { TextComponent } from '../assets/js/components/text.component.js'
import { ProjectThumbnailComponent } from '../assets/js/components/project.thumbnail.component.js'
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
    Array.from(experiences).map((project) => html.append(new ProjectThumbnailComponent(project)))
    return html
  }

}
