
class Logger {
  name = ['Logger']

  constructor(name) {
    this.name.push(name)
  }

  info(key, ...values) {
    console.log(this.name.join('.'), key, ...values)
  }

}

export default Logger
