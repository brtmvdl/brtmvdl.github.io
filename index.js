import { HTML, nH1, nLink } from '@brtmvdl/frontend'
import { HeaderComponent } from './assets/js/components/header.component.js'
import { FooterComponent } from './assets/js/components/footer.component.js'
import { LinkComponent } from './assets/js/components/link.component.js'
import { TextComponent } from './assets/js/components/text.component.js'
import products from './assets/js/lists/products.js'
import projects from './assets/js/lists/projects.js'
import { stepName } from './assets/js/utils/functions.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(new HeaderComponent())
    this.append(this.getBody())
    this.append(new FooterComponent())
  }

  getBody() {
    const html = new HTML()
    html.append(new TextComponent('Donate'))
    html.append(new LinkComponent('donate', 'https://link.mercadopago.com.br/brtmvdl'))
    html.append(new TextComponent('Social'))
    html.append(new LinkComponent('email', 'mailto:br.tmvdl@gmail.com'))
    html.append(new LinkComponent('github', 'https://github.com/brtmvdl'))
    html.append(new LinkComponent('linkedin', 'https://www.linkedin.com/in/brtmvdl/'))
    html.append(new LinkComponent('twitter', 'https://twitter.com/brtmvdl'))
    html.append(new LinkComponent('discord', 'https://discord.gg/2zWpWBgmPj'))
    html.append(new TextComponent('Products'))
    Array.from(products).map(({ id }) => html.append(new LinkComponent(id, `/products/${id}/`)))
    html.append(new TextComponent('Projects'))
    Array.from(projects).map(({ id, step }) => html.append(new LinkComponent(id + stepName(step, ' (', ') '), `/projects/${id}/`)))
    return html
  }
}
