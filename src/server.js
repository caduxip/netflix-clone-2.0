import createApp from "./app.js"

const serverPort = Number(process.env.PORT) || 3333

function startServer() {
  createApp().listen(serverPort, () => {
    console.log(`Server started on port ${serverPort}`)
  })
}

startServer()
