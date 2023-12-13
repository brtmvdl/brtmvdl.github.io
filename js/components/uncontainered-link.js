import { nLink } from '@brtmvdl/frontend'

export class nUncontaineredLink extends nLink {
  hasContainer() {
    return false
  }
}
