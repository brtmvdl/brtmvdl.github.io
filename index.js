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
    html.append(new TextComponent({ text: 'Donate' }))
    html.append(new LinkComponent({ text: 'donate', href: 'https://link.mercadopago.com.br/brtmvdl' }))
    html.append(new TextComponent({ text: 'Social' }))
    html.append(new LinkComponent({ text: 'email', href: 'mailto:br.tmvdl@gmail.com' }))
    html.append(new LinkComponent({ text: 'github', href: 'https://github.com/brtmvdl' }))
    html.append(new LinkComponent({ text: 'linkedin', href: 'https://www.linkedin.com/in/brtmvdl/' }))
    html.append(new LinkComponent({ text: 'twitter', href: 'https://twitter.com/brtmvdl' }))
    html.append(new LinkComponent({ text: 'discord', href: 'https://discord.gg/2zWpWBgmPj' }))
    html.append(new TextComponent({ text: 'Products' }))
    Array.from(products).map(({ id }) => html.append(new LinkComponent({ text: id, href: `/products/${id}/` })))
    html.append(new TextComponent({ text: 'Projects' }))
    Array.from(projects).sort((a, b) => b.step - a.step).map(({ id, step }) => html.append(new LinkComponent({ text: id + stepName(step, ' (', ') '), href: `/projects/${id}/` })))
    return html
  }
}
