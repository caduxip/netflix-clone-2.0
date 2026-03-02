import express from "express"
import { publicDirectoryPath } from "./config/paths.js"
import HomeRoute from "./routes/home_route.js"

class AppFactory {
  create() {
    const app = express()

    app.use(express.static(publicDirectoryPath))
    new HomeRoute().register(app)

    return app
  }
}

export default AppFactory
