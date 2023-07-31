import { nLink } from '../nelement/index.js'

export class nUncontaineredLink extends nLink {
  hasContainer() {
    return false
  }
}
