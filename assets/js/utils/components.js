import { HTML, nButton, nLink, nH1 } from '@brtmvdl/frontend'

export const createButton = (text, onclick = (() => { })) => {
  const button = new nButton()
  button.setText(text)
  button.on('click', () => onclick())
  return button
}

export const createLink = (text, href = '') => {
  const link = new nLink()
  link.href(href)
  if (text) link.setText(text)
  link.setStyle('display', 'inline-block')
  link.setStyle('margin', '1rem 0rem')
  link.setStyle('padding', '1rem')
  return link
}

export const createTitle = (text = '') => {
  const h1 = new nH1()
  h1.setText(text)
  h1.setStyle('display', 'inline-block')
  h1.setStyle('margin', '1rem 0rem')
  h1.setStyle('padding', '1rem')
  return h1
}
