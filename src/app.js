import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import HomeRoute from "./routes/home_route.js"

class AppFactory {
  constructor() {
    const currentFilePath = fileURLToPath(import.meta.url)
    const currentDirectory = path.dirname(currentFilePath)

    this.publicDirectoryPath = path.join(currentDirectory, "..", "public")
    this.homeRoute = new HomeRoute()
  }

  create() {
    const app = express()

    app.use(express.static(this.publicDirectoryPath))
    this.homeRoute.register(app)

    return app
  }
}

export default AppFactory
