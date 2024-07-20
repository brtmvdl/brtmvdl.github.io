import { HTML } from '../../assets/js/libs/frontend/index.js'
import { ProjectThumbnailComponent } from '../assets/js/components/project.thumbnail.component.js'
import { PaddingComponent } from '../assets/js/components/padding.component.js'
import { TextComponent } from '../assets/js/components/text.component.js'
import experiences from '../assets/js/lists/experiences.js'

export class Page extends PaddingComponent {
  onCreate() {
    super.onCreate()
    this.append(this.getBody())
  }

  getBody() {
    const html = new HTML()
    html.append(new TextComponent({ text: 'projects' }))
    Array.from(experiences).map((project) => html.append(new ProjectThumbnailComponent(project)))
    return html
  }
}
