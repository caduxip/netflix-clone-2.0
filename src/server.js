const create_app = require("./app")

const default_port = 3333
const port = Number(process.env.PORT) || default_port

function start_server() {
  const app = create_app()

  app.listen(port, () => {
    console.log(`Server start up on port ${port}!`)
  })
}

start_server()
