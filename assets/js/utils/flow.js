import * as Local from './local.js'

export const goTo = (page, data = null) => {
  Local.set([page], data)
  //
  (window.location = page)
}
