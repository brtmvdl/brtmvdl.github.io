
export class Logger {
  name = null

  constructor(name = 'logger') {
    this.name = name
  }

  log(key, ...values) {
    console.log(this.name, key, ...values)
  }

} 
