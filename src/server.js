import create_app from "./app.js"

const port = Number(process.env.PORT) || 3333

function start_server() {
  create_app().listen(port, () => {
    console.log(`Server start up on port ${port}!`)
  })
}

start_server()
