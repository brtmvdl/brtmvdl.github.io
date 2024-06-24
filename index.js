import { HTML, nH1, nLink } from '@brtmvdl/frontend'
import { HeaderComponent } from './assets/js/components/header.component.js'
import { FooterComponent } from './assets/js/components/footer.component.js'
import products from './assets/js/lists/products.js'
import projects from './assets/js/lists/projects.js'
import { createLink, createTitle } from './assets/js/utils/components.js'
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
    html.append(createTitle('Donate'))
    html.append(createLink('donate', 'https://link.mercadopago.com.br/brtmvdl'))
    html.append(createTitle('Social'))
    html.append(createLink('email', 'mailto:br.tmvdl@gmail.com'))
    html.append(createLink('github', 'https://github.com/brtmvdl'))
    html.append(createLink('linkedin', 'https://www.linkedin.com/in/brtmvdl/'))
    html.append(createLink('twitter', 'https://twitter.com/brtmvdl'))
    html.append(createLink('discord', 'https://discord.gg/2zWpWBgmPj'))
    html.append(createTitle('Products'))
    Array.from(products).map(({ id }) => html.append(createLink(id, `/products/${id}/`)))
    html.append(createTitle('Projects'))
    Array.from(projects).map(({ id, step }) => html.append(createLink(id + stepName(step, ' (', ') '), `/projects/${id}/`)))
    return html
  }
}
