// 

export class Model {
  toJSON() { return {} }

  toString() { return JSON.stringify(this.toJSON()) }
}
