import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import HomeRoute from "./routes/home_route.js"

const currentFilePath = fileURLToPath(import.meta.url)
const currentDirectory = path.dirname(currentFilePath)
const publicDirectoryPath = path.join(currentDirectory, "..", "public")

class AppFactory {
  create() {
    const app = express()

    app.use(express.static(publicDirectoryPath))
    new HomeRoute().register(app)

    return app
  }
}

export default AppFactory
