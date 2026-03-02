import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import register_home_route from "./routes/home_route.js"

const currentFilePath = fileURLToPath(import.meta.url)
const currentDirectory = path.dirname(currentFilePath)
const publicDirectoryPath = path.join(currentDirectory, "..", "public")

function createApp() {
  const app = express()

  app.use(express.static(publicDirectoryPath))
  register_home_route(app)

  return app
}

export default createApp
