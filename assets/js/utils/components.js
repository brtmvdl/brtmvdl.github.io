import { HTML, nButton } from '@brtmvdl/frontend'

export const createButton = (text, onclick = (() => { })) => {
  const button = new nButton()
  button.setText(text)
  button.on('click', () => onclick())
  return button
}
