import { HTML, nFlex, nButton } from '@brtmvdl/frontend'
import { PublicTabComponent } from './public.tab.component.js'
import { PrivateTabComponent } from './private.tab.component.js'

export class TabsComponent extends HTML {
  children = {
    tabs: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTabs())
  }

  getTabs() {
    const tabs = new HTML()
    tabs.append(this.getTabsHeader())
    tabs.append(this.getTabsContent())
    return tabs
  }

  getTabsHeader() {
    const html = new nFlex()
    html.append(this.createTabHeader('Public'))
    html.append(this.createTabHeader('Private'))
    return html
  }

  createTabHeader(text) {
    const html = new HTML()
    html.setText(text)
    html.on('click', () => this.onTabHeaderClick(text))
    return html
  }

  onTabHeaderClick(tab) {
    this.children.tabs.clear()
    this.children.tabs.append(this.getTabById(tab))
  }

  getTabById(id) {
    switch (id) {
      case 'Public': return new PublicTabComponent()
      case 'Private': return new PrivateTabComponent()
    }

    return new HTML()
  }

  getTabsContent() {
    return this.children.tabs
  }
}
