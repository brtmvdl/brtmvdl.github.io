import { Model } from './model.js'

export class JSONableModel extends Model {
  toJSON() { return {} }
}
