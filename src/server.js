import AppFactory from "./app.js"

const DEFAULT_SERVER_PORT = 3333

class Server {
  constructor(port = Number(process.env.PORT) || DEFAULT_SERVER_PORT) {
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
