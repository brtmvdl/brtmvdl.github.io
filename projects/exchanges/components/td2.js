import { HTML, nTd } from '../../../assets/js/libs/frontend/index.js'

export class nTd2 extends nTd {
  onCreate() {
    this.setStyle('padding-bottom', '1rem')
  }
}

export const createTdText = (text = '') => {
  const td = new nTd2()
  td.setText(text)
  return td
}

export const createTdHTML = (html = new HTML()) => {
  const td = new nTd2()
  td.append(html)
  return td
}
