import { HTML } from '@brtmvdl/frontend'

import { Top } from './top.js'

export class Container extends HTML {

  children = {
    content: new HTML()
  }

  onCreate() {
    this.append(new Top())
    this.append(this.getContent())
  }
  
  getContent() {
    this.children.content.setStyle('max-width', '40rem')
    this.children.content.setStyle('margin', '0 auto')
    this.children.content.setStyle('padding', '1rem')

    return this.children.content
  }
} 
