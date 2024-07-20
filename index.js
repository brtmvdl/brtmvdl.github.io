import { HTML, nFlex } from '../assets/js/libs/frontend/index.js'
import { ProjectThumbnailComponent } from './assets/js/components/project.thumbnail.component.js'
import { PaddingComponent } from './assets/js/components/padding.component.js'
import { LinkComponent } from './assets/js/components/link.component.js'
import { TextComponent } from './assets/js/components/text.component.js'
import experiences from './assets/js/lists/experiences.js'

export class Page extends PaddingComponent {
  onCreate() {
    super.onCreate()
    this.append(this.getBody())
  }

  getBody() {
    const html = new HTML()

    html.append(new TextComponent({ text: 'social' }))
    const social = new nFlex()
    social.append(new LinkComponent({ text: 'email', href: 'mailto:br.tmvdl@gmail.com' }))
    social.append(new LinkComponent({ text: 'linkedin', href: 'https://www.linkedin.com/in/brtmvdl/' }))
    social.append(new LinkComponent({ text: 'github', href: 'https://github.com/brtmvdl' }))
    social.append(new LinkComponent({ text: 'twitter', href: 'https://twitter.com/brtmvdl' }))
    social.append(new LinkComponent({ text: 'discord', href: 'https://discord.gg/2zWpWBgmPj' }))
    html.append(social)

    html.append(new TextComponent({ text: 'projects' }))
    const projects = new HTML()
    Array.from(experiences).filter(({ step }) => step >= 3).map(({ id }) => projects.append(new ProjectThumbnailComponent({ id })))
    html.append(projects)

    return html
  }
}
