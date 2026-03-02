import AppFactory from "./app.js"

class Server {
  constructor(port = Number(process.env.PORT) || 3333) {
    this.port = port
    this.appFactory = new AppFactory()
  }

  start() {
    this.appFactory.create().listen(this.port, () => {
      console.log(`Server started on port ${this.port}`)
    })
  }
}

new Server().start()
